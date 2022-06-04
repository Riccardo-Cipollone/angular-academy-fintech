import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { DayWithSlot, DayWithSlots, Location, SlotNumber } from 'src/app/models/appointment.model';
import { ConfirmAppointmentComponent } from '../confirm-appointment/confirm-appointment.component';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnChanges {

  @Output() closeDrawer: EventEmitter<null> = new EventEmitter<null>();
  @Input() selectedLocation: Location | null = null;

  appointmentDate: FormControl = new FormControl('');
  availableSlots: DayWithSlots[] = [];
  selectedAppointment: DayWithSlots | null = null;

  coordinates!: [number, number];
  locationName!: string;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private appointmentSrv: AppointmentsService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedLocation'].firstChange) {
      this.clear();
    }

    if (this.selectedLocation) {
      this.coordinates = this.selectedLocation.coords;
      this.locationName = this.selectedLocation.address;
      this.appointmentSrv.getLocationSlots(this.selectedLocation._id).subscribe({
        next: result => {
          this.availableSlots = result;
        },
        error: err => {
          console.error(err);
        }
      })
    }
  }

  setAppointmentDate(event: MatDatepickerInputEvent<any>): void {
    const index = this.availableSlots.findIndex(element => new Date(element.day).getTime() === event.value.getTime());
    this.selectedAppointment = { day: this.availableSlots[index].day, slots: this.availableSlots[index].slots }
  }

  confirmAppointment(selectedSlot: SlotNumber) {
    const newSlot: DayWithSlot = { day: this.appointmentDate.value, slot: selectedSlot };
    const dialogRef = this.dialog.open(ConfirmAppointmentComponent, {
      width: '500px',
      data: {
        day: newSlot.day,
        slot: newSlot.slot
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(res => res),
        switchMap(() => {
          return this.appointmentSrv.confirmAppointment(newSlot);
        })
      )
      .subscribe({
        next: result => {
          this.openSnackbarNotification("Appuntamento confermato!")
          this.clear();
          this.closeDrawer.emit();
        },
        error: err => {
          console.error(err);
          this.openSnackbarNotification("Qualcosa è andato storto 😢");
          this.clear();
          this.closeDrawer.emit();
        }
      })
  }

  dateFilter = (d: Date | null): boolean => {
    const dates: number[] = this.availableSlots.map(slot => new Date(slot.day).getTime());
    const day: number = (d || new Date()).getTime();

    return dates.includes(day);
  }

  openSnackbarNotification(text: string) {
    this.snackbar.open(text, "", {
      duration: 3000,
      panelClass: 'custom-snackbar'
    });
  }

  clear() {
    this.appointmentDate.reset();
    this.selectedAppointment = null;
  }

}
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { DayWithSlot, DayWithSlots, Location } from 'src/app/models/appointment.model';
import { ConfirmAppointmentComponent } from '../confirm-appointment/confirm-appointment.component';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnChanges{

  @Output() closeDrawer: EventEmitter<null> = new EventEmitter<null>();
  @Input() selectedLocation: Location | null = null;

  appointmentDate: FormControl = new FormControl('');
  availableSlots: DayWithSlots[] = mock_availableSlots;
  selectedAppointment: DayWithSlots | null = null;
  selectedSlot: DayWithSlot | null = null;

  coordinates!: [number, number];

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedLocation'].firstChange) {
      this.clear();
    }
    
    if (this.selectedLocation) {
      this.coordinates = this.selectedLocation.coords;
    }
  }

  setAppointmentDate(event: MatDatepickerInputEvent<any>): void {
    const index = this.availableSlots.findIndex(element => new Date(element.day).getTime() === event.value.getTime());
    this.selectedAppointment = { day: this.availableSlots[index].day, slots: this.availableSlots[index].slots }
  }

  confirmAppointment(selectedSlot: number) {
    console.log(selectedSlot);
    const dialogRef = this.dialog.open(ConfirmAppointmentComponent, {
      width: '500px',
      data: {
        date: this.appointmentDate.value,
        slot: selectedSlot
      }
    });

    dialogRef.afterClosed().pipe(filter(stream => stream)).subscribe(result => {
      this.snackbar.open("Appuntamento confermato!", "", {
        duration: 3000,
        panelClass: 'custom-snackbar'
      });
      this.clear();
      this.closeDrawer.emit();
    })
  }

  dateFilter = (d: Date | null): boolean => {
    const dates: number[] = this.availableSlots.map(slot => new Date(slot.day).getTime());
    const day: number = (d || new Date()).getTime();

    return dates.includes(day);
  }

  clear() {
    this.appointmentDate.reset();
    this.selectedAppointment = null;
    this.selectedSlot = null;
  }

}

const mock_availableSlots: DayWithSlots[] = [
  {
    "day": "6/25/2022",
    "slots": [
      9,
      11
    ]
  },
  {
    "day": "6/29/2022",
    "slots": [
      12,
      14,
      15,
      18
    ]
  },
  {
    "day": "6/8/2022",
    "slots": [
      10,
      13
    ]
  },
  {
    "day": "6/18/2022",
    "slots": [
      11,
      12,
      13,
      14,
      18
    ]
  },
  {
    "day": "6/26/2022",
    "slots": [
      9,
      13,
      17
    ]
  },
  {
    "day": "6/11/2022",
    "slots": [
      13,
      14,
      17,
      18
    ]
  },
  {
    "day": "6/9/2022",
    "slots": [
      9,
      13,
      14
    ]
  },
  {
    "day": "6/22/2022",
    "slots": [
      11,
      12,
      15,
      16,
      17
    ]
  },
  {
    "day": "6/12/2022",
    "slots": [
      11,
      17
    ]
  },
  {
    "day": "6/21/2022",
    "slots": [
      9,
      10,
      12,
      14,
      17
    ]
  },
  {
    "day": "6/17/2022",
    "slots": [
      10,
      15,
      16
    ]
  },
  {
    "day": "6/23/2022",
    "slots": [
      9,
      11,
      14,
      17
    ]
  },
  {
    "day": "6/2/2022",
    "slots": [
      10,
      13,
      17
    ]
  },
  {
    "day": "6/15/2022",
    "slots": [
      10,
      13,
      16
    ]
  },
  {
    "day": "6/4/2022",
    "slots": [
      14,
      18
    ]
  },
  {
    "day": "6/28/2022",
    "slots": [
      9,
      11,
      13,
      15
    ]
  },
  {
    "day": "6/7/2022",
    "slots": [
      12,
      15,
      18
    ]
  }
]

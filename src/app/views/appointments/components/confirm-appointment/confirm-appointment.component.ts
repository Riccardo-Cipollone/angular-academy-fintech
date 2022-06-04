import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DayWithSlot } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-confirm-appointment',
  templateUrl: './confirm-appointment.component.html',
  styleUrls: ['./confirm-appointment.component.scss']
})
export class ConfirmAppointmentComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DayWithSlot,
  ) { }


}

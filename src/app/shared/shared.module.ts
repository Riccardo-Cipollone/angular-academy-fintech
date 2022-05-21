import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterContactByTextPipe } from './pipes/filter-by-text.pipe';


@NgModule({
  declarations: [
    TruncatePipe,
    FilterContactByTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncatePipe,
    FilterContactByTextPipe
  ]
})
export class SharedModule { }

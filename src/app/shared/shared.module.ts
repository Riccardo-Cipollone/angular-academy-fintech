import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterContactByTextPipe } from './pipes/filter-by-text.pipe';
import { MaterialModule } from './material/material.module';
import { ValidatorsModule } from './validators/validators.module';

const modules = [ ValidatorsModule, MaterialModule, ValidatorsModule ];
const pipes = [ TruncatePipe, FilterContactByTextPipe ];
@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...pipes,
    ...modules
  ]
})
export class SharedModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SearchComponent } from './components/search/search.component';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';


@NgModule({
  declarations: [
    TransferComponent,
    ContactsComponent,
    ContactListComponent,
    ContactFormComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TransferModule { }

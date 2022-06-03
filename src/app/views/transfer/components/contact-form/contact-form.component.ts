import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact, ContactForm } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnDestroy {
  
  @ViewChild('f', { static: true }) formRef!: NgForm;

  @Output() saveContact = new EventEmitter<Partial<Contact>>();
  @Input() initialContact: Contact | null = null;

  constructor() {
    console.log("Contatto selezionato: ", this.initialContact);
  }
  
  saveContactEvent(contact: ContactForm) {
    if (this.initialContact) {
      const editedContact: Contact = {_id: this.initialContact._id, ...contact};
      this.saveContact.emit(editedContact);
      return;
    }
    
    this.saveContact.emit({...contact});
  }

  ngOnDestroy(): void {
    this.formRef.reset();
  }
}

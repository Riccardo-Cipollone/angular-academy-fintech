import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact, ContactForm } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  
  @Output() saveContact = new EventEmitter<Contact>();
  @Input() initialContact: Contact | null = null;

  @ViewChild('f', { static: true }) formRef!: NgForm;
  
  ngOnInit(): void {
    console.log("Contatto selezionato: ", this.initialContact);
  }

  saveContactEvent(contact: ContactForm) {
    if (this.initialContact) {
      const editedContact: Contact = {_id: this.initialContact._id, ...contact};
      this.saveContact.emit(editedContact);
      return;
    }
    this.saveContact.emit({_id: Math.floor(Math.random() * 10).toString(), ...contact});
  }

  ngOnDestroy(): void {
    this.formRef.reset();
  }
}

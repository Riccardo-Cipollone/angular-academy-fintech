import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ibanValidator } from 'src/app/shared/validators/iban.validator';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  
  @Output() saveContact = new EventEmitter<Partial<Contact>>();
  @Input() initialContact: Contact | null = null;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    iban: ['', [Validators.required, ibanValidator]],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.initialContact) {
      this.contactForm.setValue({ 
        name: this.initialContact.name, 
        surname: this.initialContact.surname,
        iban: this.initialContact.iban
      })
    }
  }
  
  saveContactEvent() {
    if (this.initialContact) {
      const editedContact: Contact = {_id: this.initialContact._id, ...this.contactForm.value};
      this.saveContact.emit(editedContact);
      return;
    }
    
    this.saveContact.emit({...this.contactForm.value});
  }

  ngOnDestroy(): void {
    this.contactForm.reset();
  }
}

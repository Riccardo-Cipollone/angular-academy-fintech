import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, map, startWith } from 'rxjs';
import { TaxesService } from 'src/app/api/taxes.service';
import { validateCodiceFiscale } from 'src/app/shared/validators/codice-fiscale.validator';
import { inpsValidator } from 'src/app/shared/validators/inps.validator';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent {

  inpsMatcher = new INPSErrorStateMatcher();
  // Hack! Used to clear errors after submit
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  // ? Main Form
  taxesForm = this.fb.group({
    contribuente: this.fb.group({
      codiceFiscale: this.fb.control('', validateCodiceFiscale),
      cognome: this.fb.control('', Validators.required),
      nome: this.fb.control('', Validators.required),
      dataDiNascita: this.fb.control('', Validators.required),
      sesso: this.fb.control('', Validators.required),
      comuneDiNascita: this.fb.control('', Validators.required),
      provinciaDiNascita: this.fb.control('', Validators.required),
    }),
    erario: this.fb.array([]),
    inps: this.fb.array([])
  })

  // ? Utility per selezionare i Form Arrays
  get erario() {
    return this.taxesForm.get('erario') as FormArray;
  }

  // ? Utility per selezionare i Form Arrays
  get inps() {
    return this.taxesForm.get('inps') as FormArray;
  }

  /**
  * Derived state
  */
  totaliErario$ = this.taxesForm.valueChanges.pipe(
    map(form => {
      const debito = form.erario.reduce((total: number, row: any) => +(row.debito) + total, 0);
      const credito = form.erario.reduce((total: number, row: any) => +(row.credito) + total, 0);
      const saldo = debito - credito;
      return { debito, credito, saldo };
    }),
    startWith({ debito: 0, credito: 0, saldo: 0 })
  )

  /**
  * Derived state
  */
  totaliInps$ = this.taxesForm.valueChanges.pipe(
    map(form => {
      const debito = form.inps.reduce((total: number, row: any) => +(row.debito) + total, 0);
      const credito = form.inps.reduce((total: number, row: any) => +(row.credito) + total, 0);
      const saldo = debito - credito;
      return { debito, credito, saldo }
    }),
    startWith({ debito: 0, credito: 0, saldo: 0 })
  )

  /**
  * Derived state
  */
  totale$ = combineLatest([this.totaliErario$, this.totaliInps$]).pipe(
    map(([erario, inps]) => erario.saldo + inps.saldo)
  )

  constructor(
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private snackbar: MatSnackBar
  ) { }

  createErario(): void {
    this.erario.push(this.fb.group({
      codiceTributo: this.fb.control('', Validators.required),
      anno: this.fb.control('', Validators.required),
      debito: this.fb.control('', Validators.required),
      credito: this.fb.control('', Validators.required)
    }))
  }

  createInps(): void {
    this.inps.push(this.fb.group({
      codiceSede: this.fb.control('', Validators.required),
      causaleContributo: this.fb.control('', Validators.required),
      codiceInps: this.fb.control('', Validators.required),
      da: this.fb.control('', Validators.required),
      a: this.fb.control('', Validators.required),
      debito: this.fb.control('', Validators.required),
      credito: this.fb.control('', Validators.required)
    }, {
      validators: [inpsValidator]
    }))
  }

  removeRow(arrayName: 'erario' | 'inps', index: number): void {
    const array = this.taxesForm.get(arrayName) as FormArray;
    array.removeAt(index);
  }

  onSubmit(): void {
    this.taxesService.sendForm(this.taxesForm.value).subscribe(success => {
      if (success) {
        this.snackbar.open('Form inviato con successo! 😎');
        this.erario.clear();
        this.inps.clear();
        this.taxesForm.reset();
        this.formGroupDirective.resetForm(); // Hack, clear errors
      } else {
        this.snackbar.open(`Errore nell'invio dei dati 😢`);
      }
    })
  }

}

export class INPSErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('inps');
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions);
  }
}

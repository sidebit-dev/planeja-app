import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../card-service';
import { DatasCardForm, DetailsCard } from '../datas-card';
import { ValidationErrorResponse } from '../../common/validation/validation-error-model';
import { CommonModule } from '@angular/common';

interface RegisterCardForm {
  name: FormControl<string>;
  cardNetwork: FormControl<string>;
}

@Component({
  selector: 'app-register-card',
  imports: [ReactiveFormsModule, CommonModule], // para ligar o HTML com os campos definidos
  templateUrl: './register-card.html',
  styleUrl: './register-card.scss',
})
export class RegisterCard implements OnInit {
  // Este ! não é um campo opcional
  form!: FormGroup<RegisterCardForm>;
  service = inject(CardService);
  // Qdo acessado a rota desta página, vai ser executado
  ngOnInit(): void {
    this.form = new FormGroup<RegisterCardForm>({
      name: new FormControl('', { nonNullable: true, validators: Validators.required }),
      cardNetwork: new FormControl('', { nonNullable: true, validators: Validators.required }),
    });
  }

  isFormInvalid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return true;
    }
    return false;
  }

  handleSubmit() {
    // console.log(this.form.value);
    if (this.isFormInvalid()) {
      return;
    }
    const datasCard = this.form.value as DatasCardForm;
    this.service.create(datasCard).subscribe({
      next: (response: DetailsCard) => {
        console.log('Recebendo a resposta do servidor: ', response);
      },
      // error: (error) => console.log('Ocorreu um erro: ', error),
      error: (error) => this.onApiError(error),
    });
  }

  private aplicarErrosValidacao(error: ValidationErrorResponse) {
    error.fieldsInvalids.forEach((ci) => {
      const control = this.form.get(ci.field);
      if (control) {
        control.setErrors({ apiError: ci.error }); // apiError foi inventado
        control.markAsTouched(); // Fazer disparar os erros
      }
    });
  }

  private onApiError(response: any): void {
    if (response.status === 422) {
      this.aplicarErrosValidacao(response.error);
      return;
    }
  }
}

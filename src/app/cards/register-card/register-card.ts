import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface RegisterCardForm {
  name: FormControl<string>;
  flag: FormControl<string>;
}

@Component({
  selector: 'app-register-card',
  imports: [ReactiveFormsModule], // para ligar o HTML com os campos definidos
  templateUrl: './register-card.html',
  styleUrl: './register-card.scss',
})
export class RegisterCard implements OnInit {
  // Este ! não é um campo opcional
  form!: FormGroup<RegisterCardForm>;
  // Qdo acessado a rota desta página, vai ser executado
  ngOnInit(): void {
    this.form = new FormGroup<RegisterCardForm>({
      name: new FormControl('', { nonNullable: true, validators: Validators.required }),
      flag: new FormControl('', { nonNullable: true, validators: Validators.required }),
    });
  }

  handleSubmit() {
    console.log(this.form.value);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../card-service';
import { DatasCardForm, DetailsCard } from '../datas-card';

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
  service = inject(CardService);
  // Qdo acessado a rota desta página, vai ser executado
  ngOnInit(): void {
    this.form = new FormGroup<RegisterCardForm>({
      name: new FormControl('', { nonNullable: true, validators: Validators.required }),
      flag: new FormControl('', { nonNullable: true, validators: Validators.required }),
    });
  }

  handleSubmit() {
    console.log(this.form.value);
    const datasCard = this.form.value as DatasCardForm;
    this.service.create(datasCard).subscribe({
      next: (response: DetailsCard) => {
        console.log('Recebendo a resposta do servidor: ', response);
      },
      error: (error) => console.log('Ocorreu um erro: ', error),
    });
  }
}

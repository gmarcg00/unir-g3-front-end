import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-model-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-model-student.component.html',
  styleUrl: './form-model-student.component.css',
})
export class FormModelComponent {
  modelForm: FormGroup;

  constructor() {
    this.modelForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(null, [
        Validators.minLength(8)
      ]),
      repitepassword: new FormControl(null, []),
    }, [this.checkPassword])
  }

  checkPassword(formValue: AbstractControl): any {
    const password = formValue.get('password')?.value;
    const repitepassword = formValue.get('repitepassword')?.value;
    if (password !== repitepassword) {
      return { 'checkpassword': true }
    } else {
      return null
    }
  }

  getDataForm() {
    console.log(this.modelForm.value)
    this.modelForm.reset()
  }

  checkControl(formControlName: string, validador: string) {
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }


  ngOnInit() {
    let obj = {
      id: 1,
      name: 'Luc',
      familyname: 'Skywalker',
      email: 'luc@skywalker.com',
      phone: '31415926535',
      address: 'calle Sidi Idriss 13, Matmatat-Al-Quimal',
      password: '12345678',
      repitepassword: '12345678'
    }

  }

}

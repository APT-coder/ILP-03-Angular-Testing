import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class SignupComponent {
  loginForm: any;
  submitted: boolean = false;
  
  constructor() {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      console.log(this.loginForm.value);
    }
  }
}

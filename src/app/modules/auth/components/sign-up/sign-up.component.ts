import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() registrationEvent = new EventEmitter();;
  signInFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signInFormGroup = this.fb.group({
      firstName: null,
      lastName: null,
      login: null,
      password:  null,
      confirmPassword: null,
    })
   }

  ngOnInit(): void {
  }

  submit(){
    this.registrationEvent.emit();
  }

}

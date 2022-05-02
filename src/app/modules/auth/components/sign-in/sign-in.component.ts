import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() loginEvent = new EventEmitter();;
  signInFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signInFormGroup = this.fb.group({
      login: null,
      password:  null
    })
   }

  ngOnInit(): void {
  }

  submit(){
    this.loginEvent.emit();
  }

}

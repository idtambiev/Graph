import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      email: [null, Validators.required],
      password:  [null, Validators.required]
    })
   }

  ngOnInit(): void {
  }

  submit(){
    if (this.signInFormGroup.valid){
      var value = this.signInFormGroup.value
      this.loginEvent.emit(value);
    }

  }

}

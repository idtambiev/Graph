import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss']
})
export class AuthInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() ctrl: AbstractControl = new FormControl('');
  @Input() type: string = 'text';

  get _ctrl(): FormControl {
    return this.ctrl as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

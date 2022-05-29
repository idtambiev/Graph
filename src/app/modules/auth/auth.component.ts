import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '@interfaces/models/login.model';
import { AuthService } from '@services/api/auth.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showLogin: boolean = true;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  showDifferent(status: boolean): void{
    this.showLogin = status;
  }

  login(eventResult: LoginModel){
    //console.log(eventResult);
    this.authService.login(eventResult).subscribe(
      (res)=> {
      this.storageService.set('accessToken', res.accessToken);
      this.storageService.set('refreshToken', res.refreshToken);
        this.router.navigateByUrl('')
    })
  }

}

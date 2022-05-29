import { Component } from '@angular/core';
import { AuthService } from '@services/api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Graph';
  constructor(private authService: AuthService){}
  test(){
    this.authService.test()
    .subscribe((res) => {
      //console.log(res);
    })
  }
}

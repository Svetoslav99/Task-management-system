import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  invalidCredentialsText: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email: string, password: string) {

    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      console.log('res: ', res);

      if (res.status === 200) {
        // We have logged in successfully
        this.router.navigate(['/lists']);
      }
    });

    this.invalidCredentialsText = true; // for now it will always appear, but atleast when the login credentials are invalid, the user will be notified.
  }

}

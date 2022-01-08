import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  invalidEmailText: boolean = false;
  invalidPasswordText: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onPasswordFieldClick(email: string) {
    const isValidEmail = this.isValidEmail(email);
    if (!isValidEmail)
      this.invalidEmailText = true;
    else
      this.invalidEmailText = false;

  }

  onSignupButtonClicked(email: string, password: string) {

    const isValidEmail = this.isValidEmail(email);
    const isValidPassword = this.isValidPassword(password);
    if (!isValidEmail) {
      this.invalidEmailText = true;
    } else {
      this.invalidEmailText = false;
    }

    if (!isValidPassword) {
      this.invalidPasswordText = true;
    } else {
      this.invalidPasswordText = false;
    }

    if (!isValidEmail || !isValidPassword)
      throwError(() => 'An error occured while trying to sign up.');
    else {
      this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
        this.router.navigate(['/lists']);
        console.log(res);
      });
    }

  }

  isValidEmail(email: string): boolean {
    // validation using regex compliant to RFC 2822 standard
    const regex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, 'i');
    if (regex.test(email))
      return true;

    return false
  }

  isValidPassword(password: string): boolean {
    // whatever we want to validate the password. For now only validation will be to be atleast 8 symbols long
    if (password.length >= 8)
      return true;

    return false;
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  error = '';

  constructor(private authService: AuthService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']).then();
    }
  }

  auth() {
    this.authenticate(this.email, this.password);
  }

  authenticate(email: string, password: string) {
    this.error = '';
    this.authService
      .auth(email, password)
      .subscribe((res) => {
        if (res) {
          console.log("authenticated")
          this.router.navigate(['/']).then();
        }
      }, //err => this.error = err.error.error
      )
  }
}

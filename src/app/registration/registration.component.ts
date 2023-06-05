import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  new_email = '';
  new_password = '';
  first_name = '';
  last_name = '';

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
    this.authenticate(this.new_email, this.new_password);
  }

  authenticate(email: string, password: string) {
    this.error = '';
    this.authService
      .auth(email, password)
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/']).then();
        }
      }, err => this.error = err.name)
      
  }

  createAccount() {
    this.error = '';
    this.usersService
      .create(this.first_name, this.last_name, this.new_email, this.new_password)
        .subscribe((user) => {
          if (user) {
            this.authenticate(this.new_email, this.new_password);
          }
      }, err => this.error = err.name
      )
  }
}

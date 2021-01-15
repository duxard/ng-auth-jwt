import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.authService.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special']);
      },
      error => console.log(error)
    );
  }
}

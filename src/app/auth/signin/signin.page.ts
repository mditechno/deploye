import { User } from './../../models/User';
import { Storage } from '@ionic/storage';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  login : string;
  pwd : string;
  error : boolean = false;

  constructor(private router : Router, public authService: AuthService, public storage : Storage) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if(val != null){
        this.router.navigate(['/tabs-nav/dashboard']);
      }
    });
  }

  signin() {
    if(this.login != null && this.pwd != null){      
      this.authService.signin(this.login, this.pwd).then(
        (user : User) => {
          this.storage.set('user', user);
          this.router.navigate(['/tabs-nav/dashboard']);
        },
        (error) => {
          this.error = true;
        }
      );
    }else{
      this.error = true;
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user : User;
  isAuth : boolean = false;

  constructor(private storage : Storage, private router : Router, public authService: AuthService) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.user = val;
      this.isAuth = (val != null) ? true : false;
    });
  }

  signout(){
    this.authService.signout();
    this.storage.remove('user');
    this.router.navigate(['/welcome']);
  }
}
import { User } from './../../models/User';
import { Cart } from './../../models/Cart';
import { CartsService } from './../../services/carts.service';
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  firstname : string;
  lastname : string;
  email : string;
  pwd : string;
  error : boolean = false;

  constructor(
    private router : Router, 
    private storage: Storage, 
    public authService: AuthService, 
    private cartsService : CartsService) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if(val != null){
        this.router.navigate(['/tabs-nav/dashboard']);
      }
    });
  }

  signup() {
    if(this.email != null && this.pwd != null){      
      this.authService.signup(this.email, this.pwd).then(
        (user : User) => {
          
          this.storage.set('user', user);

          let newCart : Cart = {
            userId : this.email,
            articles : []
          };

          this.cartsService.createCart(newCart, user.id);
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

  navigateToSignin() {
    this.router.navigate(['/signin']);
  }

}

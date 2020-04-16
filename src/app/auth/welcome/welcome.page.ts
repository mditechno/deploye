import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    speed: 400
    };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToLogin() {
    this.router.navigate(['/signin']);
  }

}

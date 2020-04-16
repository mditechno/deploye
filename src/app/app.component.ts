import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCJK0BCG48FrNIaTAuhmxQXfMpuTZhp4B4",
      authDomain: "easylist-67355.firebaseapp.com",
      databaseURL: "https://easylist-67355.firebaseio.com",
      projectId: "easylist-67355",
      storageBucket: "easylist-67355.appspot.com",
      messagingSenderId: "705112347550",
      appId: "1:705112347550:web:ef72ea3b161fa6896efc8f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

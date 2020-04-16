import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CartActionsComponent } from './components/cart-actions/cart-actions.component';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { CartsService } from './services/carts.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoriesService } from './services/categories.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent, CategoryViewComponent, CartActionsComponent],
  entryComponents: [CategoryViewComponent, CartActionsComponent],
  imports: [
    BrowserModule, 
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriesService,
    AuthGuardService,
    AuthService,
    CartsService,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./auth/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'welcome', pathMatch: 'full',
    loadChildren: () => import('./auth/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    loadChildren: './pages/tabsnav/tabsnav.module#TabsnavPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

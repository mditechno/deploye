import { AuthGuardService } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from '@angular/router';

import { TabsnavPageRoutingModule } from './tabsnav-routing.module';
import { TabsnavPage } from './tabsnav.page';

const routes: Routes = [
  {
    path: 'tabs-nav',
    component: TabsnavPage,
    children: [
      {
        path: 'dashboard', canActivate: [AuthGuardService],
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'settings', canActivate: [AuthGuardService],
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs-nav/dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsnavPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsnavPage]
})

export class TabsnavPageModule { }
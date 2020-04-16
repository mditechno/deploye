import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsnavPage } from './tabsnav.page';

const routes: Routes = [
  {
    path: '',
    component: TabsnavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsnavPageRoutingModule {}

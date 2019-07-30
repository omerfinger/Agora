import { NgModule } from '@angular/core';
import { ModuleWithProviders } from "@angular/core";
import { MyActivity } from './components/my-activity/my-activity.component';
import { Lost } from './components/lost/lost.component';
import { Found } from './components/found/found.component';
import { Search } from './components/search/search.component';
import { Admin } from './components/admin/admin.component';
import { Stats } from './components/stats/stats.component';
import { User } from './components/user/user.component';
import { Home } from './components/home/home.component';
import { Login } from './components/login/login.component';
import { SignUp } from './components/sign-up/sign-up.component';
import { NeedAuthGuard} from './components/utils/NeedAuthGuard';

import { RouterModule, Routes } from '@angular/router';
import { SearchItemsComponent } from './components/search-items/search-items.component';


const appRoutes: Routes = [
    { path: '', component: Login},
    { path: 'sign-up', component: SignUp},
    { path: 'home', component: Home, canActivate: [NeedAuthGuard], children: [
      { path: 'my-activity', component: MyActivity},
      { path: 'lost', component: Lost},
      { path: 'found', component: Found},
      { path: 'search', component: Search},
      { path: 'admin', component: Admin},
      { path: 'stats', component: Stats},
      { path: 'user', component: User}
    ]}
  ];

  export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);

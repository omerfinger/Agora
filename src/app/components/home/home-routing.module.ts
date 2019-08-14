import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { MyActivity } from '../my-activity/my-activity.component';
import { Lost } from '../lost/lost.component';
import { Found } from '../found/found.component';
import { Admin } from '../admin/admin.component';
import { Stats } from '../stats/stats.component';
import { User } from '../user/user.component';
import { Home } from './home.component';
import { NeedAuthGuard} from '../utils/NeedAuthGuard';


const homeRoutes: Routes = [
    { path: 'home', component: Home, canActivate: [NeedAuthGuard], children: [
        { path: 'my-activity', component: MyActivity},
        { path: 'lost', component: Lost},
        { path: 'found', component: Found},
        { path: 'admin', component: Admin},
        { path: 'stats', component: Stats},
        { path: 'user/:userDetails', component: User}
    ]},
  ];

  export const homeRoutingModule: ModuleWithProviders = RouterModule.forChild(homeRoutes);

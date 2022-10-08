import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { InputComponent } from './shared/input/input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { TravelListComponent } from './travel-list/travel-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'travel-list',
    component: TravelListComponent
  },
  {
    path: 'users/:username',
    component: UserProfileComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

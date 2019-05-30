import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'event-create',
    loadChildren:
      './pages/event-create/event-create.module#EventCreatePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'event-detail/:id',
    loadChildren:
      './pages/event-detail/event-detail.module#EventDetailPageModule',
    canActivate: [AuthGuard],
  },
  { path: 'event-list', loadChildren: './pages/event-list/event-list.module#EventListPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'alta-duenio', loadChildren: './pages/alta-duenio/alta-duenio.module#AltaDuenioPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  {
     path: 'comida-create',
     loadChildren: './pages/comida-create/comida-create.module#ComidaCreatePageModule',
     canActivate: [AuthGuard]
   },
  {
    path: 'comida-detail/:id',
    loadChildren: './pages/comida-detail/comida-detail.module#ComidaDetailPageModule',
    canActivate: [AuthGuard]
   },
  { path: 'comida-list', loadChildren: './pages/comida-list/comida-list.module#ComidaListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

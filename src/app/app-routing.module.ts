import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { MoviesComponent } from './recommend/recommend.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'recommend', component: MoviesComponent },
  { path: 'recommend/:type', component: MoviesComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

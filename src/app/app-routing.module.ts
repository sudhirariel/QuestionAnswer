import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFormComponent } from './module/home-form/home-form.component';
import { ReviewAnswerComponent } from './module/review-answer/review-answer.component';
const routes: Routes = [

   {
    path: '',
    component: HomeFormComponent
  }, {
    path: 'form/review',
    component: ReviewAnswerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }

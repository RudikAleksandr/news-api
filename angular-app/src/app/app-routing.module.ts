import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';

const routes: Routes = [
  {path: '', component: NewsListComponent},
  {path: 'content/:source/:id', component: NewsContentComponent},
  {path: 'edit/:id', component: NewsEditComponent},
  {path: 'add', component: NewsEditComponent},
];
  NewsListComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

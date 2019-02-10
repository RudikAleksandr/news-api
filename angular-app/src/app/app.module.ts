import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsListComponent } from './news-list/news-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderAppComponent,
    NewsItemComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

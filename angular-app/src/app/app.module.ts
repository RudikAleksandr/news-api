import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsEditAddComponent } from './news-edit-add/news-edit-add.component';
import { NewsService } from './services/news/news.service';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { NewsApiService } from './services/news-api/news-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderAppComponent,
    NewsItemComponent,
    NewsListComponent,
    NewsContentComponent,
    NewsEditAddComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    NewsService,
    NewsApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

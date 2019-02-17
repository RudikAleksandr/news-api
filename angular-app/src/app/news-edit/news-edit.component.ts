import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DbNewsUser from '../../utils/db-news-user'

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  private news: Object = {};

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(this.handlerRouteParams.bind(this));
   }

  ngOnInit() {
  }

  handlerRouteParams(params: Object) {
    const idNews = params['id'];
    this.news = DbNewsUser.getUserNewsById(idNews);
  }

  handleClickCancel() {

  }
}

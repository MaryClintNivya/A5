import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns = ['number', 'state', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: ExampleDataSource | null;

  constructor(http: HttpClient) {

    this.exampleDatabase = new ExampleHttpDao(http);
    this.dataSource = new ExampleDataSource(this.exampleDatabase);

  }
}

export interface GithubIssue {

  number: string;
  state: string;
  title: string;

}

export class ExampleHttpDao {

  private issuesUrl = 'https://api.github.com/repos/angular/material2/issues';  // URL to web API

  constructor(private http: HttpClient) { }

  getRepoIssues(): Observable<GithubIssue[]> {

    return this.http.get<GithubIssue[]>(this.issuesUrl);

  }
}

export class ExampleDataSource extends DataSource<GithubIssue> {

  constructor(private _exampleDatabase: ExampleHttpDao) {
    super();
  }

  connect(): Observable<GithubIssue[]> {
    return this._exampleDatabase.getRepoIssues();
  }

  disconnect() { }
}


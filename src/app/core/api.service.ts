import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';
import * as credentials from '../../credentials.json';

import {
  SearchResult,
  Series,
  VideosResult
} from '@models';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get backendUrl(): string {

    return (<any>credentials).backend.url;

  }

  public getGravatar(email: string): string {

    return `https://gravatar.com/avatar/${Md5.hashStr(email)}`;

  }

  public backendSearch(query: string): Promise<SearchResult[]> {

    return new Promise((resolve, reject) => {

      this.http.get(
        `${(<any>credentials).backend.url}/search`,
        { params: new HttpParams().set('q', query.trim()) }
      )
      .subscribe((results: SearchResult[]) => {

        resolve(results);

      }, (error) => {

        console.error(error);
        reject();

      });

    });

  }

  public backendSeries(id: number): Promise<Series> {

    return new Promise((resolve, reject) => {

      this.http.get(
        `${(<any>credentials).backend.url}/series`,
        { params: new HttpParams().set('id', id + '')}
      )
      .subscribe((results: Series) => {

        resolve(results);

      }, (error) => {

        console.error(error);
        reject();

      })

    });

  }

  public backendVideos(query: string): Promise<VideosResult[]> {

    return new Promise((resolve, reject) => {

      this.http.get(
        `${(<any>credentials).backend.url}/videos`,
        { params: new HttpParams().set('q', query.trim())}
      )
      .subscribe((results: VideosResult[]) => {

        resolve(results);

      }, (error) => {

        console.error(error);
        reject();

      });

    });

  }

}

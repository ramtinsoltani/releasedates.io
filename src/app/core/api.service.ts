import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';
import * as credentials from '../../credentials.json';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getGravatar(email: string): string {

    return `https://gravatar.com/avatar/${Md5.hashStr(email)}`;

  }

  public thetvdb = new (class {

    constructor(private parent: ApiService) { }

    public getToken(): Promise<string> {

      return new Promise((resolve, reject) => {

        this.parent.http.post(
          'https://api.thetvdb.com/login',
          { apikey: (<any>credentials).thetvdb.apiKey }
        )
        .subscribe((response: any) => {

          console.log(response);
          resolve(response.token);

        }, (error) => {

          console.log(error);
          reject(error);

        });

      });

    }

  })(this);

}

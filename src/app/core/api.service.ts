import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getGravatar(email: string): string {

    return `https://gravatar.com/avatar/${Md5.hashStr(email)}`;

  }

}

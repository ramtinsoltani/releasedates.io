import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import {
  AuthService,
  ApiService
} from '@services';

import { FirebaseUser } from '@models';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Not a request to backend
    if ( req.url.substr(0, this.api.backendUrl.length) !== this.api.backendUrl ) {

      return next.handle(req);

    }

    if ( this.auth.isUserLoggedin() ) {

      return this.auth.getToken()
      .mergeMap((token: string) => {

        const params = new HttpParams({ fromString: req.params.toString() }).append('token', token);

        return next.handle(req.clone({
          params: params
        }));

      });

    }
    else {

      return this.auth.userChanged
      .mergeMap(() => {

        return this.auth.getToken()

      })
      .mergeMap((token: string) => {

        const params = new HttpParams({ fromString: req.params.toString() }).append('token', token);

        return next.handle(req.clone({
          params: params
        }));

      });

    }

  }

}

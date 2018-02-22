import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import * as credentials from '../../credentials.json';

@Injectable()
export class FireAgentService {

  constructor() {

    firebase.initializeApp((<any>credentials).firebase);

  }

}

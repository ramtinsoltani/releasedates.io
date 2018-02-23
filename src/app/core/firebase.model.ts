export interface FirebaseError {

  message: string;
  code: string;
  credential?: any;
  email?: string;

}

export class FirebaseUser {

  constructor(
    public displayName: string,
    public email: string,
    public emailVerified: boolean,
    public photoURL: string,
    public firebaseUID: string,
    public providerUID: string,
    public facebook: boolean
  ) { }

}

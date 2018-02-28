export class Pin {

  constructor(
    public id: number,
    public name: string,
    public thumbnails: string[],
    public lastUpdated: number
  ) { }

}

export interface PinIdentity {

  id: number;
  key: string;

}

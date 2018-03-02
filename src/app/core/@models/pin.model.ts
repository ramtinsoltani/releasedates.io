export class Pin {

  constructor(
    public id: number,
    public name: string,
    public thumbnail: string,
    public lastUpdated: number,
    public hasNewEpisode: boolean
  ) { }

}

export interface PinIdentity {

  id: number;
  key: string;

}

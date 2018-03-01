import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { Router } from '@angular/router';

import {
  Pin
} from '@models';

import {
  StorageService
} from '@services';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  @Input('pin')
  public pin: Pin;

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() { }

  public onPinClick(): void {

    this.router.navigate([`/series/${this.pin.id}`]);

  }

  public onUnpin(): void {

    this.storage.unpinSeries(this.pin.id);

  }

}

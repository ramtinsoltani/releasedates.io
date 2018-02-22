import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onFind(value: string): void {

    if ( value && value.trim() ) this.router.navigate(['/search'], { queryParams: { q: value.trim() } });

  }

}

import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';

import {
  transition,
  style,
  animate,
  trigger
} from '@angular/animations';

import {
  Season,
  Episode
} from '@models';

import { C3Service } from '@services';

@Component({
  selector: 'app-series-season',
  templateUrl: './series-season.component.html',
  styleUrls: ['./series-season.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(500, style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class SeriesSeasonComponent implements OnInit {

  @ViewChild('episodeModal')
  public episodeModal: any;

  @Input('season')
  public season: Season;

  @Input('runtime')
  public runtime: string;

  public seasonYear: string;

  constructor(
    private render: Renderer2,
    private c3: C3Service
  ) { }

  ngOnInit() {

    this.seasonYear = this.c3.getSeasonYear(this.season.episodes);

  }

  public formatRuntime(): string {

    return this.c3.formatRuntime(this.runtime);

  }

  public onEpisodeHover(event: MouseEvent): void {

    this.render.addClass(event.target, 'active');

  }

  public onEpisodeLeave(event: MouseEvent): void {

    this.render.removeClass(event.target, 'active');

  }

  public onOpenEpisode(episode: Episode): void {

    this.episodeModal.open(episode);

  }

  public isEpisodeUpcoming(episode: Episode): boolean {

    return this.c3.isEpisodeUpcoming(episode);

  }

}

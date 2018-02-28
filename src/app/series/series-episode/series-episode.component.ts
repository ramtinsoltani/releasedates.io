import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ApiService,
  C3Service
} from '@services';

import {
  Episode,
  VideosResult
} from '@models';

import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-series-episode',
  templateUrl: './series-episode.component.html',
  styleUrls: ['./series-episode.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(500, style({
          opacity: 1
        }))
      ]),
      transition('* => void', [
        animate(500, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class SeriesEpisodeComponent implements OnInit {

  @ViewChild('content')
  public content: ElementRef;

  @Input('seasonNumber')
  public seasonNumber: number;

  public episodeAirDate: string;
  public isUpcoming: boolean;
  public episode: Episode;

  public pending: boolean = false;
  public showError: boolean = false;
  public videoResults: VideosResult[] = [];

  constructor(
    private modal: NgbModal,
    private api: ApiService,
    private c3: C3Service,
    private render: Renderer2
  ) { }

  ngOnInit() { }

  public open(episode: Episode): void {

    this.episode = episode;
    this.isUpcoming = this.c3.isEpisodeUpcoming(episode);
    this.episodeAirDate = this.c3.getEpisodeAirDate(episode, this.c3.seriesAirDate);

    this.videoResults = [];
    this.showError = false;

    if ( ! this.isUpcoming && this.episodeAirDate ) {

      this.pending = true;

      this.api.backendVideos(`${this.c3.seriesName} ${episode.name ? episode.name : ('season ' + this.seasonNumber + ' episode ' + episode.number)}`)
      .then((results: VideosResult[]) => {

        this.videoResults = results;
        this.pending = false;
        this.showError = false;

      })
      .catch(() => {

        this.videoResults = [];
        this.pending = false;
        this.showError = true;

      });

    }

    this.modal.open(this.content, { size: 'lg' });

  }

  public onVideoHover(event: MouseEvent): void {

    this.render.addClass(event.target, 'active');

  }

  public onVideoLeave(event: MouseEvent): void {

    this.render.removeClass(event.target, 'active');

  }

}

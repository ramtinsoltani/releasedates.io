import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ApiService,
  C3Service
} from '@services';

import { Episode } from '@models';

@Component({
  selector: 'app-series-episode',
  templateUrl: './series-episode.component.html',
  styleUrls: ['./series-episode.component.scss']
})
export class SeriesEpisodeComponent implements OnInit {

  @ViewChild('content')
  public content: ElementRef;

  @Input('seasonNumber')
  public seasonNumber: number;

  public episodeAirDate: string;
  public episode: Episode;

  constructor(
    private modal: NgbModal,
    private api: ApiService,
    private c3: C3Service
  ) { }

  ngOnInit() { }

  public open(episode: Episode): void {

    this.episode = episode;

    this.episodeAirDate = this.c3.getEpisodeAirDate(episode, this.c3.seriesAirDate);
    this.modal.open(this.content, { size: 'lg' });

  }

}

import { Injectable } from '@angular/core';

import {
  MonthNames,
  Episode,
  EpisodeSummary,
  Season,
  Discovered
} from '@models';

@Injectable()
export class C3Service {

  public seriesAirDate: string;
  public seriesName: string;
  public seriesLastUpdated: number;
  public seriesId: number;
  public seriesHasNewEpisode: boolean;
  public lastRoute: string = '/';

  public getEpisodeAirDate(episode: Episode, seriesAirDate: string): string {

    if ( ! episode.airDate ) return null;

    const year = +episode.airDate.substr(0, 4);
    const month = +episode.airDate.substr(5, 2) - 1;
    const date = +episode.airDate.substr(8, 2);

    return `${MonthNames[month]} ${date}, ${year}${seriesAirDate ? ' at ' + seriesAirDate.substr(seriesAirDate.length - 8) : ''}`;

  }

  public sanitizeSeason(season: Season): Season {

    const sanitizedSeason: Season = {
      number: season.number,
      episodes: []
    };

    for ( const episode of season.episodes ) {

      if ( ! episode.airDate && ! episode.name ) continue;

      sanitizedSeason.episodes.push(episode);

    }

    return sanitizedSeason;

  }

  public sanitizeDiscovered(discovered: Discovered[]): Discovered[] {

    const sanitized: Discovered[] = [];

    for ( const series of discovered ) {

      if ( series.name ) sanitized.push(series);

    }

    return sanitized;

  }

  public isEpisodeUpcoming(episode: Episode | EpisodeSummary): boolean {

    if ( ! episode.airDate ) return false;

    const year = episode.airDate.substr(0, 4);
    const month = episode.airDate.substr(5, 2);
    const date = episode.airDate.substr(8, 2);

    const airDate = new Date(+year, +month - 1, +date);
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    return airDate.getTime() >= today.getTime();

  }

  public getNextEpisodeAirDate(season: Season, seriesAirDate: string): string {

    for ( const episode of season.episodes ) {

      if ( this.isEpisodeUpcoming(episode) ) {

        return this.getEpisodeAirDate(episode, seriesAirDate);

      }

    }

    return null;

  }

  public formatRuntime(runtime: string): string {

    if ( ! runtime ) return '';

    const hours = Math.floor(+runtime / 60);
    const minutes = +runtime % 60;

    return `${hours ? (hours < 10 ? '0' + hours : hours) + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:00`;

  }

  public getSeasonYear(episodes: Episode[]): string {

    const years = [];
    const range = [];

    for ( const episode of episodes ) {

      if ( episode.airDate && ! years.includes(episode.airDate.substr(0, 4)) ) years.push(episode.airDate.substr(0, 4));

    }

    const min = Math.min(...years);
    const max = Math.max(...years);

    range.push(min);
    if ( min !== max ) range.push(max);

    return range.join('-');

  }

}

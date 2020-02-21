import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Video, emptyVideo} from './video';
import { of } from 'rxjs';
import * as uuid from 'uuid/v1';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=25';

@Injectable({ providedIn: 'root' })
export class VideosService {

  constructor(private httpClient: HttpClient) { }

  getUrl() {
    return `${BASE_URL}`
  }

  all() {
    return this.httpClient.get(this.getUrl()).pipe(
      // APPEND ANY ADDITIONAL FIELDS ONTO GENERIC 'VIDEO'
      map((x: any) => x.items),
      map((x: any) => x.map((xx) => ({id: xx.id, title: xx.snippet.title, description: xx.snippet.description})))
    )
  }

  create({title, description}) {
    return of({
      id: uuid(),
      description,
      title,
    });
  }

  update(model: Video) {
    return of(model);
  }

  delete(model) {
    return of(model);
  }
}

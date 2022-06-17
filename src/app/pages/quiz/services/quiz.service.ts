import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Environment
import { environment } from 'src/environments/environment';

// Models
import { QuizResponse } from 'src/app/models/quiz.model';

@Injectable()
export class QuizService {
  private _url = environment.api + 'quiz.json';

  constructor(private _http: HttpClient) {}

  get(): Observable<QuizResponse> {
    return this._http.get<QuizResponse>(this._url);
  }
}

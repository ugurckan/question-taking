import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Models
import { Quiz } from 'src/app/models/quiz.model';

@Injectable()
export class QuizService {
  constructor(private _http: HttpClient) {}

  get(): Observable<Quiz> {
    return this._http.get<Quiz>('../../../data/quiz.json');
  }
}

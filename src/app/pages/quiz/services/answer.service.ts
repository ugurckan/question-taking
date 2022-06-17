import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

// Environment
import { environment } from 'src/environments/environment';

// Models
import { AnswerResponse } from 'src/app/models/question.model';

@Injectable()
export class AnswerService {
  private _count = 3;
  private _url = environment.api + 'answer.json';

  constructor(private _http: HttpClient) {}

  check(): Observable<AnswerResponse> {
    if (this._count === 0) {
      this._count = 3;
      return throwError(
        () =>
          new HttpErrorResponse({
            error: { code: 400, message: 'Bad Request' },
            status: 400,
            statusText: 'Bad Request',
          })
      );
    }

    this._count -= 1;
    return this._http.get<AnswerResponse>(this._url);
  }
}

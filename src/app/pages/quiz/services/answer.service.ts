import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AnswerService {
  constructor(private _http: HttpClient) {}

  check() {
    return this._http.get('../../../data/answer.json');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: [],
})
export class QuestionComponent implements OnInit {
  private _questionNumber: number = 0;

  get questionNumber(): number {
    return this._questionNumber;
  }

  set questionNumber(value: number) {
    this._questionNumber = value;
  }

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.pipe(first()).subscribe((res) => {
      console.log(33, res);

      this.questionNumber = res['id'];
    });
  }
}

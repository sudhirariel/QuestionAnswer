import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-answer',
  templateUrl: './review-answer.component.html',
  styleUrls: ['./review-answer.component.css'],
})
export class ReviewAnswerComponent implements OnInit {
  usersForm!: FormGroup;
  data: any;
  dataCheckbox: any;
  selectData: any;
  paraQues: any;
  question: any;
  ans: any;

  IsParaPart: boolean = false;
  isBoxPart: boolean = false;

  reviewList: any = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getParaData();
    this.renderReviewFormData();
    //this.getSelectData();
  }
  getParaData() {
    debugger;
    this.data = localStorage.getItem('myParaQues');

    if (this.data != '') {
      this.paraQues = JSON.parse(this.data);
      this.question = this.paraQues.paraQuestion;
      this.ans = this.paraQues.paraAnswer;
    }
  }
  initForm() {
    debugger;

    this.usersForm = this.fb.group({
      paraQuestion: ['', Validators.required],
      paraAnswer: ['', Validators.required],
      firstCheckBox: ['', Validators.required],
      secondCheckBox: ['', Validators.required],
      thirdCheckBox: ['', Validators.required],
      fourthCheckBox: ['', Validators.required],
      fifthCheckBox: ['', Validators.required],
    });
  }

  renderReviewFormData() {
    let data = localStorage.getItem('reviewFormData') ?? '';
    try {
      let parsedData = JSON.parse(data);
      this.reviewList = parsedData;
    } catch (error) {
      console.log(error);
    }
    console.log(this.reviewList);
    debugger;
  }
}

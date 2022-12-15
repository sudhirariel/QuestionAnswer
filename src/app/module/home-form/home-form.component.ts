import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
declare var window: any;
@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css'],
})
export class HomeFormComponent implements OnInit {
  paraForm!: FormGroup;
  // isCheckedPara:boolean |null =null;
  // isCheckedBox:boolean  |null =null;
  IsPara: boolean = false;
  IsBox: boolean = false;
  isParaValidation: boolean = false;
  //qestionModal: any;
  showForm: boolean = false;
  isRequired: boolean = false;
  allowUserToSpecifyAnswer: boolean = false;
  checkboxBoxQuestion: string = '';
  errorMessage: string = '';
  reviewQuestionAnswers: any = [
    {
      paragraphQuestion: '',
      paragraphAnswer: '',
      checkBoxOptions: [],
    },
  ];

  formJson: any = {
    showParagraph: this.IsPara,
    paragraphQuestion: '',
    showCheckBox: this.IsBox,
    checkBoxOptions: [
      {
        value: '',
        isSelected: false,
        placeholder: '',
      },
    ],
    isRequired: this.isRequired,
  };

  constructor(private fb: FormBuilder, private router: Router) { }

  // paraForm = new FormGroup({
  //   paraQuestion: new FormControl(''),
  //   paraAnswer: new FormControl(''),

  // });
  formModal: any;
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
    // this.qestionModal = new window.bootstrap.Modal(
    //   document.getElementById('questionPopUp')
    // );
    this.initForm();
  }
  initForm() {
    // 

    this.paraForm = this.fb.group({
      paraQuestion: ['', Validators.required],
      paraAnswer: [''],
      checkBoxQuestion: [false], //sir ye checkbox hai ya text?
    });
  }
  get questionFormControl(): { [key: string]: AbstractControl } {

    console.log(this.paraForm.controls);

    return this.paraForm.controls;
  }
  values: any = [];

  removevalue(i: any) {
    this.values.splice(i, 1);
  }

  addvalue() {

    if (this.values.length > 4) {
      return alert('Only able to add 5 options');
    }

    this.values.push({
      value: '',
      placeHolder: 'Add another option',
      isSelected: false,
    });

  }

  onBlur() {

  }
  get appllicantFormControl() {
    return this.paraForm.controls;
  }
  openModal() {
    this.formModal.show();
    this.IsPara = false;
    this.IsBox = false;
  }
  doSomething() {
    this.formModal.hide();

    this.IsPara = false;
    this.IsBox = false;
  }
  openParagraphInput() {
    this.showForm = true;
    this.IsBox = false;
    this.IsPara = true;
  }
  openSelectBox() {
    this.showForm = true;
    this.IsBox = true;
    this.IsPara = false;
  }
  getValue(i: any, value: any) {

    this.values[i].value = value;

    console.log(this.formDataList);
  }
  toggleVisibility(e: any) {
    this.isRequired = e.target.checked;
  }
  toggleVisibilityAns(e: any) {
    this.allowUserToSpecifyAnswer = e.target.checked;
  }

  formDataList: any = [];
  // convenience getter for easy access to form fields
  get f() {
    return this.paraForm.controls;
  }
  saveData() {

    if (this.paraForm.invalid) return;
    this.formJson = {};

    this.formJson['showParagraph'] = this.IsPara;
    this.formJson['paragraphQuestion'] = this.paraForm.value.paraQuestion;
    this.formJson['showCheckBox'] = this.IsBox;
    this.formJson['checkBoxOptions'] = this.values;
    this.formJson['isRequired'] = this.isRequired;
    this.formJson['allowUserToSpecifyAnswer'] =
      this.paraForm.value.paraQuestion;
    this.formJson['paraAnswer'] = this.paraForm.value.paraAnswer;
    this.formJson['selectedAnswers'] = false;
    this.formDataList.push(this.formJson);

    localStorage.setItem('myParaQues', JSON.stringify(this.formDataList));
    this.values = [];

    if (this.formDataList?.length) this.errorMessage = '';

    this.paraForm.reset();
    this.formModal.hide();
  }

  checkedAnswers(e: any, index: any, item: any) {

    const paragraphQuestion = item.paragraphQuestion;
    let data = this.formDataList.find(
      (x: any) => x.paragraphQuestion == paragraphQuestion && x.showCheckBox
    );
    const filter = data.checkBoxOptions.find(function (o: any) { return o.value == index.value; })
    filter.isSelected = e.target.checked;
  }
  onCheckBoxQuestion(e: any) {

    this.checkboxBoxQuestion = e.target.value;
  }
  paraAnswer(e: any, index: any) {
    const paragraphQuestion = index.paragraphQuestion;
    let data = this.formDataList.find(
      (x: any) => x.paragraphQuestion == paragraphQuestion
    );
    data.paraAnswer = e.target.value;
  }

  getValidations(data: any) {
    console.log(data);
    let index = data.findIndex((i: any) => i.paraAnswer?.length > 0);
    if (index !== -1) {
    }

  }

  submitDynamicForm(): any {

    let checkboxArray = this.formDataList.filter(function (x: any) { return x.showCheckBox && x.isRequired });
    let required = this.formDataList.filter(
      (item: any) =>
        item.isRequired === true &&
        (item.paraAnswer === '' || item.paraAnswer === null) && !item.showCheckBox
    );

    //check for checkbox required validation.

    let isCheckboxRequired = true;
    if (checkboxArray.length > 0) {
      isCheckboxRequired = this.isValidCheckBoxRequired(checkboxArray);
    } else { isCheckboxRequired = false; }


    if (required?.length || isCheckboxRequired)
      return (this.errorMessage = 'Please fill all required fields');
    if (!this.formDataList?.length)
      return (this.errorMessage = "Oops! You don't have added any questions.");
    localStorage.setItem('reviewFormData', JSON.stringify(this.formDataList));
    this.router.navigate(['/form/review']);
  }
  isValidCheckBoxRequired(filterlist: any) {
    debugger
    filterlist.filter(function (o: any) {

      let checkedData = o.checkBoxOptions.filter(function (op: any) {
        return op.isSelected;
      });
      if (checkedData.length == 0) { return true; }
      else return false;
    });
    return false;
  }
}

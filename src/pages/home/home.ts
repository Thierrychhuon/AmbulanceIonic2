import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NavController, Slides } from 'ionic-angular';
import { HospitalValidator } from  '../../validators/hospital';
import { ButtonCheckbox } from '../../component/button-radio.component'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('signUpSlider') signUpSlider: Slides ;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;
  public arrowLeft: string;
  public arrowRight: string;
  public currentSlide: string;
  //Switch button or toggle button contains 1 or 0
  switchButtonState: boolean = false;
  switchButtonState2: boolean = false;
  //public title: string;
  show: boolean = true;

  submitAttempt: boolean = false;
  otherSelected: boolean = false;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.arrowLeft = 'none';
    this.arrowRight='Medical providers';
    this.currentSlide="Identification";
    //this.title = 'Initial title';

    this.slideOneForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [''],
      gender: ['', Validators.required],
      telephone: ['']
    });

    this.slideTwoForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'),Validators.required])],
      privacy: ['', Validators.required]
    });

    this.slideThreeForm = this.formBuilder.group({
      biolo: ['']
    });

  }

  next(){
        this.signUpSlider.slideNext();
    }

  prev(){
      this.signUpSlider.slidePrev();
  }

  save(){
    this.submitAttempt = true;
    if(!this.slideOneForm.valid){
        this.signUpSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
        this.signUpSlider.slideTo(1);
    }
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
    }
  }

  otherOn(event){
    console.log("otherOn!")
    this.otherSelected = true ;
  }

  onSlideChange(slide) {
    // You can use the slide parameter to get info from it or just use the slider reference to know the index of the active slide
    let currentIndex = this.signUpSlider.getActiveIndex();
    if(currentIndex == 0){
      this.arrowLeft = 'none';
      this.arrowRight='Medical providers';
      this.currentSlide="Identification";

    }else if(currentIndex == 1){
      this.arrowLeft = 'Identification';
      this.arrowRight='Health problems';
      this.currentSlide="Medical providers";
    }else{
      this.arrowLeft = 'Identification';
      this.arrowRight='none';
      this.currentSlide="Health problems";
    }
    //this.title = "Slider " + currentIndex;
  }

  test(){
    console.log(this.switchButtonState);
  }
}

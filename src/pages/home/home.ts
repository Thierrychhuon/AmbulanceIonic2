import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NavController, Slides } from 'ionic-angular';
import { HospitalValidator } from  '../../validators/hospital';

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
  //public title: string;

  submitAttempt: boolean = false;
  otherSelected: boolean = false;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.arrowLeft = 'none';
    this.arrowRight='Medical providers';
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
      privacy: ['', Validators.required],
      bio: ['']
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
    }else if(currentIndex == 1){
      this.arrowLeft = 'Identification';
      this.arrowRight='Health problems';
    }else{
      this.arrowLeft = 'Identification';
      this.arrowRight='none';
    }
    //this.title = "Slider " + currentIndex;
  }

}

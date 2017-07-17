import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('signUpSlider') signUpSlider: Slides ;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

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

}

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NavController, Slides } from 'ionic-angular';
import { HospitalValidator } from  '../../validators/hospital';
import { WhoPage } from '../whoareyou/whoAreYou';
import emailMask from 'text-mask-addons/dist/emailMask';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { PostServiceProvider } from '../../providers/post-service/post-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register2.html'
})
export class RegisterPage {

  @ViewChild('signUpSlider') signUpSlider: Slides ;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;

  emailMask = emailMask;
  genders: Array<string>;
  hospitals: Array<string>;
  allergiesM: Array<string>;
  slideOneArray: Array<string>;
  slideTwoArray: Array<string>;
  slideThreeArray: Array<string>;

  public arrowLeft: string;
  public arrowRight: string;
  public currentSlide: string;

  //Switch button or toggle button contains 1 or 0
  switchButtonState: boolean = false;
  switchButtonState2: boolean = false;
  show: boolean = true;

  submitAttempt: boolean = false;
  otherSelected: boolean = false;

  allergiesToggle:boolean = true;
  chronicToggle:boolean = true;
  hereditaryToggle:boolean = true;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public localStorage: LocalStorageProvider, public postService: PostServiceProvider) {
    this.arrowLeft = 'none';
    this.arrowRight='Medical providers';
    this.currentSlide="Identification";

    this.slideOneForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+@[a-zA-Z]+.[a-zA-Z]{2,4}$')])],
      gender: ['', Validators.required],
      telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[\+0-9]{10,12}$')])],
      dateOfBirth: ['', Validators.required]
    });

    this.slideTwoForm = this.formBuilder.group({
      hospital: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      personnalDoctor: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      hospital2: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      personnalDoctor2: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      hospital3: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      personnalDoctor3: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])]
    });

    this.slideThreeForm = this.formBuilder.group({
      chronicDisease: [''],
      allergiesM:[''],
      hereditaryDisease: ['']
    });

    this.genders = [
      "Male",
      "Female",
      "Other"
    ];

    this.hospitals = [
      "Bangkok Hospital China Town",
      "Bangkok Hospital",
      "Bumrungrad Medical Center Limited",
      "Bangkok Hospital Dental Center",
      "The Bangkok Christian Hospital",
      "Thonburi Hospital",
      "Other"
    ];

    this.allergiesM = [
      "Medicine 1",
      "Medicine 2",
      "Medicine 3",
      "Medicine 4",
      "Medicine 5",
      "Medicine 6",
    ];

    this.slideOneArray =[
      "firstName",
      "lastName",
      "email",
      "gender",
      "telephone",
      "dateOfBirth"
    ]

    this.slideTwoArray =[
      "hospital",
      "personnalDoctor",
      "hospital2",
      "personnalDoctor2",
      "hospital3",
      "personnalDoctor3"
    ]

    this.slideThreeArray =[
      "allergiesM",
      "chronicDisease",
      "hereditaryDisease"
    ]
  }

  //ionViewDidLoad() {
  //}

  validation_messages = {
    'firstName': [
      { type: 'required', message: 'First name is required.' },
      { type: 'maxlength', message: 'First name cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your first name should only contain letters.' },
    ],

    'lastName': [
      { type: 'required', message: 'Last name is required.' },
      { type: 'maxlength', message: 'Last name cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your last name should only contain letters.' },
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],

    'telephone': [
      { type: 'required', message: 'Telephone is required.' },
      { type: 'pattern', message: 'Enter a valid number.' }
    ],

    'hospital': [
      { type: 'required', message: 'Hospital is required.' },
      { type: 'pattern', message: 'Enter a valid hospital.' }
    ],

    'personnalDoctor': [
      { type: 'required', message: ' Personnal doctor is required.' },
      { type: 'maxlength', message: 'Personnal doctor cannot be more than 25 characters long.' },
      { type: 'pattern', message: "Your personnal doctor's name should only contain letters." },
    ],

    'hospital2': [
      { type: 'pattern', message: 'Enter a valid hospital.' }
    ],

    'personnalDoctor2': [
      { type: 'maxlength', message: 'Personnal doctor cannot be more than 25 characters long.' },
      { type: 'pattern', message: "Your personnal doctor's name should only contain letters." },
    ],

    'hospital3': [
      { type: 'pattern', message: 'Enter a valid hospital.' }
    ],

    'personnalDoctor3': [
      { type: 'maxlength', message: 'Personnal doctor cannot be more than 25 characters long.' },
      { type: 'pattern', message: "Your personnal doctor's name should only contain letters." },
    ],

    'gender': [
      { type: 'required', message: 'The gender is required.' }
    ],

    'dateOfBirth': [
      { type: 'required', message: 'The date of birth is required.' }
    ],
  };


  // Test
  test(){ this.navCtrl.setRoot(WhoPage); }
  remove(){ console.log("remove"); this.localStorage.removeAll(); }

  getdatastored(){
      for (let field of this.slideOneArray) {
        console.log(field);
        this.localStorage.getData('slideOneData',field);
      }
      for (let field of this.slideTwoArray) {
        console.log(field);
        this.localStorage.getData('slideTwoData',field);
      }
      for (let field of this.slideThreeArray) {
        console.log(field);
        this.localStorage.getData('slideThreeData',field);
      }
  }

  getdatastored2(){
      console.log("jojo")
      this.localStorage.getData('slideOneData','firstName');
  }

  // Slide navigation
  next(){
    this.signUpSlider.slideNext();
    console.log(this.arrowLeft)
    console.log(this.arrowRight)
  }
  prev(){ this.signUpSlider.slidePrev(); }
  goToSlideI(){ this.signUpSlider.slideTo(0); }
  goToSlideM(){ this.signUpSlider.slideTo(1); }
  goToSlideH(){ this.signUpSlider.slideTo(2); }

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
    }else if(currentIndex == 2){
      this.arrowLeft = 'Identification';
      this.arrowRight='none';
      this.currentSlide="Health problems";
    }else{
      this.currentSlide="Update";
      this.arrowLeft = 'Identification';
      this.arrowRight='none';
    }
    //this.title = "Slider " + currentIndex;
  }

  // Submit button
  save(){
    this.submitAttempt = true;
    if(!this.slideOneForm.valid){
        this.signUpSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
        this.signUpSlider.slideTo(1);
    }
    else if(!this.slideThreeForm.valid){
        this.signUpSlider.slideTo(2);
    }
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
        console.log(this.slideThreeForm.value);
        this.localStorage.storeData('slideOneData',this.slideOneForm.value);
        this.localStorage.storeData('slideTwoData',this.slideTwoForm.value);
        this.localStorage.storeData('slideThreeData',this.slideThreeForm.value);
        //Send data to server
        //let response = this.postService.registration(Object.assign(this.slideOneForm.value, this.slideTwoForm.value,this.slideThreeForm.value));
        this.navCtrl.setRoot(WhoPage);
    }
  }

  //If Other is on
  otherOn(event){
    console.log("otherOn!")
    this.otherSelected = true ;
  }

  //Accordion form "Health Problems"
  isAllToggleOn() {
      return this.allergiesToggle;
  };
  isChroToggleOn() {
      return this.chronicToggle;
  };
  isHereToggleOn() {
      return this.hereditaryToggle;
  };

  //Manage response from Server
  registrationManagement(data){
    data.then(data =>{
      if(data.requestStatus=='success'){
        this.localStorage.storeData('Hash+ID', data);
      }else if(data.requestStatus=='similar'){
        this.localStorage.storeData('SimilarData', data);
        //Ask the user to choose
        //Update the server or phone
        //Delete SimilarData
      }else{
        console.log("Error in the registration management")
      }
    });
  }

}

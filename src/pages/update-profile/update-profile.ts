import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NavController, Slides } from 'ionic-angular';
import { HospitalValidator } from  '../../validators/hospital';
import { WhoPage } from '../whoareyou/whoAreYou';
import emailMask from 'text-mask-addons/dist/emailMask';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { PostServiceProvider } from '../../providers/post-service/post-service';

@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html'
})
export class UpdateProfilePage {

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

  ionViewDidLoad() {
    this.initUpdate();
  }

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
  test(){
    var jojo;
    let dataP = this.localStorage.getItem('slideOneData');
    dataP.then(data => {
      console.log('1'+data);
      console.log('1'+JSON.parse(data));
      console.log('1'+JSON.parse(data)['firstName']);
    });
    console.log('1'+dataP);
    console.log('1'+JSON.parse(jojo));
  }

  initUpdate(){
    let dataP = this.localStorage.getItem('slideOneData');
    dataP.then(data => {
      for (let field2 of this.slideOneArray) {
        this.slideOneForm.controls[field2].setValue(JSON.parse(data)[field2]);
        console.log('1'+JSON.parse(data));
      }
    });

    let dataP2 = this.localStorage.getItem('slideTwoData');
    dataP2.then(data => {
      for (let field3 of this.slideTwoArray) {
        this.slideTwoForm.controls[field3].setValue(JSON.parse(data)[field3]);
        console.log('2'+data);
      }
    });

    let dataP3 = this.localStorage.getItem('slideThreeData');
    dataP3.then(data => {
      for (let field of this.slideThreeArray) {
        this.slideThreeForm.controls[field].setValue(JSON.parse(data)[field]);
        console.log('3'+JSON.parse(data)[field]);
      }
    });

  }

  getdatastored2(){
      console.log("jojo")
      this.localStorage.getData('slideOneData','firstName');
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

  // Submit button
  save(){
    this.submitAttempt = true;
    if(this.slideOneForm.valid && this.slideTwoForm.valid && this.slideThreeForm.valid){
        console.log("Update!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
        console.log(this.slideThreeForm.value);
        let data1= this.localStorage.storeData('slideOneData',this.slideOneForm.value);
        let data2=this.localStorage.storeData('slideTwoData',this.slideTwoForm.value);
        let data3=this.localStorage.storeData('slideThreeData',this.slideThreeForm.value);
        //Send data to server
        //this.editManagement(this.postService.edit(Object.assign(data1, data2, data3)));
        this.goBack();
    }
  }

  //navigation
  goBack(){
    this.navCtrl.setRoot(WhoPage);
  }

  editManagement(json){
    //this.localStorage.storeData('Hash', json);
    console.log("Hash & Id stored")
  }

}

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NavController, Slides } from 'ionic-angular';
import { HospitalValidator } from  '../../validators/hospital';
import { ButtonCheckbox } from '../../component/button-radio.component'

import { WhoPage } from '../whoareyou/whoAreYou';

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

  allergiesToggle:boolean = true;
  chronicToggle:boolean = true;
  hereditaryToggle:boolean = true;
  //items: any = [];
  //itemExpandHeight: number = 100;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.arrowLeft = 'none';
    this.arrowRight='Medical providers';
    this.currentSlide="Identification";
    //this.title = 'Initial title';

    this.slideOneForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$')])],
      gender: ['', Validators.required],
      telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[\+0-9]{10,12}$')])]
    });

    this.slideTwoForm = this.formBuilder.group({
      hospital: ['', Validators.required],
      personnalDoctor: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      hospital2: [''],
      personnalDoctor2: [''],
      hospital3: [''],
      personnalDoctor3: ['']
    });

    this.slideThreeForm = this.formBuilder.group({
      chronicDisease: [''],
      allergieAlimentaire:[''],
      hereditaryDisease: [''],
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
        this.navCtrl.setRoot(WhoPage);
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

  request(){
    this.navCtrl.push(WhoPage);
  }
  /*ngAfterViewInit() {
    this.signUpSlider.autoHeight = true;
  }*/

/*
  expandItem(item){
        this.items.map((listItem) => {
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
            return listItem;
        });
    }
*/
  isAllToggleOn() {
      return this.allergiesToggle;
  };
  isChroToggleOn() {
      return this.chronicToggle;
  };
  isHereToggleOn() {
      return this.hereditaryToggle;
  };
/*-- STUB functions --/
//Send data from phone and get the hash, the Id, and a json if there are a mismatch. These data will be read and stored into a json.
sendDataToServer(dataFromPhone){
  let headers = new Headers();

  let body = {
    message: "New user"
  };

  this.http.post('server adresse', JSON.stringify(body), {headers: headers})
    .map(res=>res.json())
    .subscribe(data => {
      console.log(data);
  });
}
//Read the json, If “Data from server field” is not empty, call storeOrUpdate(dataFromPhone, json), else do nothing.
mismatch(dataFromPhone, json){
  Provider ?

}
}
//Show a windows with both data given. If the user choose the data from the server, call storedDataFromServer(json), else call updateDataServer(dataFromPhone).
storeOrUpdate(dataFromPhone, json){
  if(userchoice){
    storedDataFromServer(json?);
  }else{
    updateDataServer(dataFromPhone?);
  }
}
//Stored data from json.
storedDataInPhone(json){
  Open/Read Json
  storage.set('name', 'storage.get('name')');
  storage.set('lastname', 'storage.get('lastname')');
}
//Send data to the server into a json.
updateDataServer(dataFromPhone){
//Get Json ?
  let headers = new Headers();

  let body = {
    message: "Update data"
  };

  this.http.post('server adresse', JSON.stringify(body), {headers: headers})
    .map(res=>res.json())
    .subscribe(data => {
      console.log(data);
  });
}

/* ----*/
}

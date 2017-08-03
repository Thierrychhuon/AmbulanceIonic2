import { NavController, Slides } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

//declare var google;

@Component({
  selector: 'page-ambulance',
  templateUrl: 'ambulanceRequest.html'
})

export class AmbulancePage {

  @ViewChild('ambulanceSlider') ambulanceSlider: Slides ;
  //@ViewChild('map') mapElement: ElementRef;

  //map: any;
  //mapInitialised: boolean = false;
  //apiKey: any;

  public currentSlide: string;
  public otherSlide: string;

  constructor(public navCtrl: NavController) {
    //this.loadGoogleMaps();
    this.currentSlide="Location";
    this.otherSlide="Symptoms";
  }

  goToSymptoms(){
    this.ambulanceSlider.slideNext();
    this.currentSlide="Symptoms";
    this.otherSlide="Location";
    console.log("next")
  }


  goToLocation(){
    this.ambulanceSlider.slidePrev();
    this.currentSlide="Location";
    this.otherSlide="Symptoms";
    console.log("previous")
  }

/* isRequestStored Time need to be checked*\
  isRequestStored(){
    this.storage.get('pendingRequest').then((data) => {
      if(data != null){
        this.pendingRequest = JSON.parse(data);
        console.log(pendingRequest)
        return true;
      }else{
        return false;
      }
    }
  }
/*------------*/

/* Save Get location first*\
save(){
  //this.submitAttempt = true;
  if(!this.slideLocation.valid){
      this.ambulanceSlider.slideTo(0);
  }
  else if(!this.slideSymptoms.valid){
      this.ambulanceSlider.slideTo(1);
  }
  else {
      console.log("success!")
      console.log(this.slideLocation.value);
      console.log(this.slideSymtoms.value);
  }
}
/*------------*/
}

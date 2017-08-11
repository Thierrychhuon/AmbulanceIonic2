import { NavController, Slides } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
//import { IonicStorageModule } from '@ionic/storage';

declare var google;

@Component({
  selector: 'page-ambulance',
  templateUrl: 'ambulanceRequest.html'
})

export class AmbulancePage {

  @ViewChild('requestSlider') requestSlider: Slides ;
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  public currentSlide: string;
  public otherSlide: string;
  public userName: string;
  public gender: string;

  constructor(public navCtrl: NavController, public connectivityService: ConnectivityServiceProvider, private geoloc: Geolocation) {
    //this.loadGoogleMaps();
    this.currentSlide="Location";
    this.otherSlide="Symptoms";
    this.userName="Jean";
    this.gender="M.";
  }

  ionViewDidLoad() {
    //this.requestSlider.lockSwipes(true);
    this.loadGoogleMaps();
  }

  goToSymptoms(){
    this.requestSlider.slideNext();
    this.currentSlide="Symptoms";
    this.otherSlide="Location";
    console.log("next")
  }

  goToLocation(){
    this.requestSlider.slidePrev();
    this.currentSlide="Location";
    this.otherSlide="Symptoms";
    console.log("previous")
  }

  // ---------------------Google map -------------------//
  loadGoogleMaps(){

    this.addConnectivityListeners();

  if(typeof google == "undefined" || typeof google.maps == "undefined"){

    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();

    if(this.connectivityService.isOnline()){
      console.log("online, loading map");

      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }

      let script = document.createElement("script");
      script.id = "googleMaps";

      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
      }

      document.body.appendChild(script);

    }
  }
  else {

    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }

  }

  }

  initMap(){

    this.mapInitialised = true;

    this.geoloc.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    });

  }

  disableMap(){
    console.log("disable map");
  }

  enableMap(){
    console.log("enable map");
  }

  addConnectivityListeners(){

    let onOnline = () => {

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){

          this.loadGoogleMaps();

        } else {

          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }
  // -------------------------------------------------------//


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

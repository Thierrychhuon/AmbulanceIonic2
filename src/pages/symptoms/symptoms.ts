import { NavController, Slides, Platform } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions,
 Marker } from '@ionic-native/google-maps';
import 'rxjs/add/operator/map';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AmbulancePage } from '../ambulancerequest/ambulanceRequest';

declare var google;

@Component({
  selector: 'page-symptoms',
  templateUrl: 'symptoms.html'
})

export class SymptomsPage {

  @ViewChild('requestSlider') requestSlider: Slides ;
  //@ViewChild('map') mapElement: ElementRef;

  //map: GoogleMap;
  //mapInitialised: boolean = false;
  //apiKey: any;

  public currentSlide: string;
  public otherSlide: string;
  public userName: string;
  public gender: string;

  params: Object;
  pushPage: any;

  constructor(public navCtrl: NavController, public connectivityService: ConnectivityServiceProvider,
    private geoloc: Geolocation, public platform: Platform, private googleMaps: GoogleMaps, public localStorage: LocalStorageProvider) {
    //this.loadGoogleMaps();
    this.currentSlide="Location";
    this.otherSlide="Symptoms";
    this.userName="Jean";
    this.gender="M.";

    this.pushPage = SymptomsPage;
    this.params = { id: 5 };
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  goToSymptoms(){
    //this.requestSlider.slideNext();
    //this.currentSlide="Symptoms";
    //this.otherSlide="Location";
    //console.log("next")
  }

  goToLocation(){
    //this.requestSlider.slidePrev();
    //this.currentSlide="Location";
    //this.otherSlide="Symptoms";
    //console.log("previous")
    this.navCtrl.pop(SymptomsPage);
  }

  loadMap() {
 // make sure to create following structure in your view.html file
 // and add a height (for example 100%) to it, else the map won't be visible
 // <ion-content>
 //  <div #map id="map" style="height:100%;"></div>
 // </ion-content>

 // create a new map by passing HTMLElement
 let element: HTMLElement = document.getElementById('map');

 let map: GoogleMap = this.googleMaps.create(element);

 // listen to MAP_READY event
 // You must wait for this event to fire before adding something to the map or modifying it in anyway
 map.one(GoogleMapsEvent.MAP_READY).then(
   () => {
     console.log('Map is ready!');
     // Now you can add elements to the map like the marker
   }
 );

 this.geoloc.getCurrentPosition().then((resp) => {
   let lat = resp.coords.latitude;
   let lng = resp.coords.longitude;
   console.log(resp.coords.latitude)
   // create CameraPosition
   let position: CameraPosition = {
     target: {
       lat: lat,
       lng: lng
     },
     zoom: 18,
     tilt: 30
   };

   // move the map's camera to position
   map.moveCamera(position);

 }).catch((error) => {
   console.log('Error getting location', error);
 });

 }

  // ---------------------Google map -------------------//
  /*loadGoogleMaps(){

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

  }*/
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

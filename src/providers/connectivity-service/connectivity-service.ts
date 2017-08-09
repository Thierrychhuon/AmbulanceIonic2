import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

declare var Connection;

@Injectable()
export class ConnectivityServiceProvider {

  onDevice: boolean;

  constructor(public platform: Platform, public network: Network){
    console.log("Hello Connectivity Provider")
    this.onDevice = this.platform.is('cordova');
    //let networkListener = this.network.onchange().subscribe(
    //  (v) => console.log(v),
    //  (err) => console.error(err) // {error: "no_such_method"}
    //);
  }

  isOnline(): boolean {
    if(this.onDevice && this.network.type){
      return this.network.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice && this.network.type){
      return this.network === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}

import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

  constructor(public platform: Platform, public nativeStorage: NativeStorage) {
    console.log('Hello LocalStorageProvider Provider');
  }

  storeData(name, data){
    this.nativeStorage.setItem(name, JSON.stringify(data))
      .then(() => console.log('Stored Login Data!'+JSON.stringify(data)+'Test getfirstName: '+data.firstName),
      error => console.error('Error storing Data', error));
  }

  getData(dataStored, item){
    this.nativeStorage.getItem(dataStored)
      .then(data =>console.log(item+': '+JSON.parse(data)[item]),
      error => console.error('Error getting Data', error));
  }

  getItem(dataStored):any{
    return this.nativeStorage.getItem(dataStored)
      .then(data => {
        console.log(data)
        return data;
      },
      error => console.error('Error getting Data', error));
  }

  removeAll(){
    console.log("success remove")
    this.nativeStorage.clear();
  }
}

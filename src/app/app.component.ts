import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { WhoPage } from '../pages/whoareyou/whoAreYou';
import { RegisterPage } from '../pages/register2/register2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RegisterPage;
  public userInformation;
  private storage: Storage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.helloworld();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  helloworld(){
    console.log("Hello mon poste!")
  }

  /* IsDataStored *\
  isDataStored(){
    this.storage.get('userInformation').then((data) => {
      if(data != null){
        this.userInformation = JSON.parse(data);
        console.log('userInformation')
        return true;
      }else{
        this.rootPage=WhoPage;
        return false;
      }
    }
  }
  /* ------ */

}

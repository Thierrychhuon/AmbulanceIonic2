import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { PostServiceProvider } from '../providers/post-service/post-service';
import { HomePage } from '../pages/home/home';
import { WhoPage } from '../pages/whoareyou/whoAreYou';
import { RegisterPage } from '../pages/register2/register2';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = RegisterPage;
  public userInformation;
  private storage: Storage;
  private isDataStored: boolean;
  private hash: string;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public nativeStorage: NativeStorage, public postService: PostServiceProvider, public localStorage: LocalStorageProvider) {
    this.helloworld();
    this.isDataStored= false;
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.checkDataStored();
      let serverResponse= this.postService.authentication(this.hash);
      splashScreen.hide();
    });
  }

  helloworld(){
    console.log("Hello mon poste!")
  }

  checkDataStored(){
    let dataP=this.nativeStorage.getItem('slideOneData');
    dataP.then(
        data => {
            console.log("isDataStored activated")
            this.rootPage=WhoPage;
          },
        error => {
        console.error('Error getting Data', error)
      });;
    console.log(this.isDataStored)
  }

  //Create an hash with userInformation
  authentication(jsonP){
    jsonP.then(
        data => {
          if(data.requestStatus=='success'){
            this.localStorage.storeData('Hash+ID', data);
            console.log("Hash: "+data)
          }else if(data.requestStatus=='not registered'){
            console.log("Not registered")
            //Ask the user to choose
            //Update the server or phone
            //Delete SimilarData
          }else if(data.requestStatus=='mismatch'){
            this.localStorage.storeData('mismatch', data);
          }else{
            console.log("Error in the registration management")
          }
        },
        error => {
        console.error('Error getting Data', error)
      });
  }


}

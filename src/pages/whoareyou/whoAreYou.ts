import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AmbulancePage } from '../ambulancerequest/ambulanceRequest';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-who',
  templateUrl: 'whoAreYou.html'
})
export class WhoPage {
  constructor(public navCtrl: NavController, public localStorage: LocalStorageProvider) {

  }

  //test
  remove(){ console.log("remove"); this.localStorage.removeAll(); }

  goToPatient(){
    console.log("goToPatient!")
    this.navCtrl.push(AmbulancePage);
  }

  goToBystander(){
    console.log("goToBystander!")
    this.navCtrl.push(AmbulancePage);
  }

  goToUpdate(){
    console.log("goToUpdate!")
    this.navCtrl.setRoot(UpdateProfilePage);
  }

  test(){
    console.log("Go!")
    this.navCtrl.push(UpdateProfilePage);
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AmbulancePage } from '../ambulancerequest/ambulanceRequest';
import { UpdateProfilePage } from '../update-profile/update-profile';

@Component({
  selector: 'page-who',
  templateUrl: 'whoAreYou.html'
})
export class WhoPage {
  constructor(public navCtrl: NavController) {

  }

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

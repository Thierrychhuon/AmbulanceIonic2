import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AmbulancePage } from '../ambulancerequest/ambulanceRequest';

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
}

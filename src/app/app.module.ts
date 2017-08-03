import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WhoPage } from '../pages/whoareyou/whoAreYou';
import { AmbulancePage } from '../pages/ambulancerequest/ambulanceRequest';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { ExpandableComponent } from '../components/expandable/expandable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WhoPage,
    AmbulancePage,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WhoPage,
    AmbulancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider
  ]
})
export class AppModule {}

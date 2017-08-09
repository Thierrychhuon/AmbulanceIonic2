import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
//Page
import { HomePage } from '../pages/home/home';
import { WhoPage } from '../pages/whoareyou/whoAreYou';
import { AmbulancePage } from '../pages/ambulancerequest/ambulanceRequest';
import { RegisterPage } from '../pages/register2/register2';
//Providers
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { ExpandableComponent } from '../components/expandable/expandable';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { ValidatorsModule } from '../validators/validators.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WhoPage,
    AmbulancePage,
    ExpandableComponent,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ValidatorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WhoPage,
    AmbulancePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider,
    Network,
    Geolocation
  ]
})
export class AppModule {}

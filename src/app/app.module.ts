import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

//Page
import { HomePage } from '../pages/home/home';
import { WhoPage } from '../pages/whoareyou/whoAreYou';
import { AmbulancePage } from '../pages/ambulancerequest/ambulanceRequest';
import { RegisterPage } from '../pages/register2/register2';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { SymptomsPage } from '../pages/symptoms/symptoms';

//Providers
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { ExpandableComponent } from '../components/expandable/expandable';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { ValidatorsModule } from '../validators/validators.module';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { PostServiceProvider } from '../providers/post-service/post-service';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng,} from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WhoPage,
    AmbulancePage,
    ExpandableComponent,
    RegisterPage,
    UpdateProfilePage,
    SymptomsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ValidatorsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WhoPage,
    AmbulancePage,
    RegisterPage,
    UpdateProfilePage,
    SymptomsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider,
    Network,
    Geolocation,
    LocalStorageProvider,
    NativeStorage,
    PostServiceProvider,
    GoogleMaps
  ]
})
export class AppModule {}

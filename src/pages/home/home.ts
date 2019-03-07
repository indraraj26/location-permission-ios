import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public isLocactionAuthorizedd;
  public isLocationAviabledd;
  public getLocationAuthorizationStatussed;
   public locationAccs;
   public islocationEnableddd;

  constructor(public navCtrl: NavController, private plt: Platform,
    private diagnostic: Diagnostic, private locationAccuracy: LocationAccuracy) {

  }

  ionViewWillEnter() {
   if(this.plt.is('cordova')) {
     if(this.plt.is('ios')) {
       console.log("location service enabled or not checking");
          this.diagnostic.isLocationEnabled().then((yes) => {
            if(!yes) {
              console.log("lets go to location setting")
              this.diagnostic.switchToSettings();
            }
            else {
              this.diagnostic.getLocationAuthorizationStatus().then((status) => {
                    if((status == 'denied') || (status == 'not_determined')) {
                      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
                        console.log("can request boolean", canRequest)
                        if(canRequest) {
                          console.log("location request");
                          // the accuracy option will be ignored by iOS
                          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                            () => console.log('Request successful'),
                            error => console.log('Error requesting location permissions', error)
                          );
                        }
                      });
                    }
              }).catch(err => console.log("get location authroization error", err))
            }
          }) 
     }
   }
  } 

  checkLocationSetting() {
    this.diagnostic.isLocationAuthorized().then((yes) => {
      console.log("location authorized",yes)
      this.isLocactionAuthorizedd = yes;
    }).catch(err => console.log(err));
    this.diagnostic.isLocationAvailable().then((yes) => {
      console.log("location available", yes);
      this.isLocationAviabledd = yes;
    }).catch(err => console.log(err))
    this.diagnostic.getLocationAuthorizationStatus().then((yes) => {
      console.log("get getLocationAuthorizationStatus", yes);
      this.getLocationAuthorizationStatussed = yes;
    }).catch(err => console.log(err))
    this.diagnostic.isLocationEnabled().then((yes) => {
      console.log("is location enabled", yes);
      this.islocationEnableddd = yes;
    }).catch(err => console.log(err));
  }

 letsGotoLocationSetting() {
    this.diagnostic.switchToSettings();
  }


}

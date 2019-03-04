import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';

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
    private diagnostic: Diagnostic, private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation) {

  }

  /* ionViewWillEnter() {
   if(this.plt.is('cordova')) {
     if(this.plt.is('ios')) {
       console.log("location service enabled or not checking");
          this.diagnostic.isLocationEnabled().then((yes) => {
            if(!yes) {
              console.log("lets go to location setting")
              this.diagnostic.switchToLocationSettings();
            }
            else {
              this.locationAccuracy.canRequest().then((canRequest: boolean) => {
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
          }) 
     }
   }
  }  */

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


    ionViewDidLoad() {
      setTimeout(() => {
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log("lat", resp.coords.latitude);
          console.log("lng", resp.coords.longitude);
         }).catch((error) => {
           console.log('Error getting location', error);
         });
         
      }, 5000)
    }

    enableLocation()
{
  this.diagnostic.getLocationAuthorizationStatus().then((yes) => {
    if(yes == 'denied') {
      console.log("get getLocationAuthorizationStatus", yes);
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {

        if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        (v) => {alert('Request successful')
          this.locationAccs = v; 
        },
        error => alert('Error requesting location permissions'+JSON.stringify(error))
        );
        }
        else {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            (v) => {alert('Request successful')
              this.locationAccs = v; 
            },
            error => alert('Error requesting location permissions'+JSON.stringify(error))
            );
        }
        
        });
        }
    this.getLocationAuthorizationStatussed = yes;
  }).catch(err => console.log(err))
}

}

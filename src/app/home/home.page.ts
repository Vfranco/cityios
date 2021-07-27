import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker } from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap;
  getCoords: GeolocationPosition;

  constructor(private geo: Geolocation) { }

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {

    this.geo.getCurrentPosition().then((coords: GeolocationPosition) => {
      this.getCoords = coords;

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.getCoords.coords.latitude,
            lng: this.getCoords.coords.longitude
          },
          zoom: 18,
          tilt: 30
        },
        controls: {
          zoom: false
        }
      }

      this.map = GoogleMaps.create('map', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
        position: {
          lat: this.getCoords.coords.latitude,
          lng: this.getCoords.coords.longitude
        }
      });

      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        console.log('click!');
      });
    });
  }
}

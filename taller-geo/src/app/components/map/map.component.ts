import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { GeoService } from 'src/app/services/geo/geo.service'
import { Subscription } from 'rxjs'
import { AgmInfoWindow } from '@agm/core'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: number
  longitude: number

  currentIW: AgmInfoWindow = null
  previousIW: AgmInfoWindow = null

  icon = {
    url: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/21_Angular_logo_logos-512.png",
    scaledSize: {
      width: 20,
      height: 20
    }
  }
  markers: any
  subscription: Subscription

  rangeSearch = 10
  showRadio = true
  moveRadio = false
  longitudeSearch: number
  latitudeSearch: number

  constructor(private geoService: GeoService, private changeDetectorRef: ChangeDetectorRef) { }

  changeRange() {
    this.previousIW=null
    this.geoService.filterLocations(this.rangeSearch * 3, [this.latitudeSearch, this.longitudeSearch])
  }
  centerChange($event) {
    this.previousIW=null
    if ($event) {
      this.latitudeSearch = $event.coords.lat
      this.longitudeSearch = $event.coords.lng
      this.geoService.filterLocations(this.rangeSearch * 3, [this.latitudeSearch, this.longitudeSearch])
    }
  }

  ngOnInit() {
    this.getUserLocation()
    this.subscription = this.geoService.nearGeoPoints.subscribe(points => {
      this.markers = points
      this.changeDetectorRef.detectChanges()
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude

        this.latitudeSearch = this.latitude
        this.longitudeSearch = this.longitude
        this.geoService.filterLocations(this.rangeSearch * 3, [this.latitudeSearch, this.longitudeSearch])
      })
    }
  }

  onMapClick() {
    if (this.previousIW) {
      this.previousIW.close()
    }
  }

  onMarkerClick(infoWindow: any) {
    if (this.previousIW) {
      this.currentIW = infoWindow
      this.previousIW.close()
    }
    this.previousIW = infoWindow
  }

}


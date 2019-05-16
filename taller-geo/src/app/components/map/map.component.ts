import { Component, OnInit } from '@angular/core'
import { GeoService } from 'src/app/services/geo/geo.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: number
  longitude: number

  icon = {
    url: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/21_Angular_logo_logos-512.png",
    scaledSize: {
      width: 20,
      height: 20
    }
  }

  constructor(private geoService:GeoService) { }

  ngOnInit() {
    this.getUserLocation()
  } 
  private getUserLocation() { 
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.geoService.filterLocations(5000, [this.latitude, this.longitude])
      })
    }
  }
}


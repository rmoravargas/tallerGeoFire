 import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

import { GeoFire } from 'geofire'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GeoService { 

  geoFire: GeoFire
  nearGeoPoints = new BehaviorSubject([])

  constructor(private angularFireDatabase: AngularFireDatabase) {
    const dbReference = this.angularFireDatabase.database.ref('/locations')
    this.geoFire = new GeoFire(dbReference)
    // this.initDatabase()
  }
  filterLocations(radius: number, coords: Array<number>) {
    this.nearGeoPoints.next([])
    this.geoFire.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key:string, location:number, distance:number) => {
        let point = {
          location: location,
          distance: distance
        }

        let currentPoints = this.nearGeoPoints.value
        currentPoints.push(point)
        this.nearGeoPoints.next(currentPoints)
      })
  }
  private initDatabase() {
    let initPoints = [
      [9.3783697, -83.7275296],
      [9.3783697, -83.7975296],
      [9.3683697, -83.7675296],
      [9.3583697, -83.7275296],
      [9.3283697, -83.7475296],
      [9.3727354, -83.7020414]
    ]

    initPoints.forEach((point, index) => { 
      this.geoFire.set(`nuevo-punto-${index}`, point)
    })
  }

}
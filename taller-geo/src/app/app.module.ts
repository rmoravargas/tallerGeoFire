import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { GeoService } from './services/geo/geo.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
 
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AgmCoreModule.forRoot({ apiKey: environment.googleMapsKey }),
    AngularFireDatabaseModule,
    FormsModule 
  ],
  providers: [GeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

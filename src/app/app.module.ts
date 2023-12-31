
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { WelcomeComponent } from './home/welcome.component';
import { MoviesComponent } from './recommend/recommend.component';
import { PosterUrlPipe } from './shared/poster-url.pipe';
import { TextFilterPipe } from './shared/text-filter.pipe';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    AppComponent, 
    WelcomeComponent,
    MoviesComponent,
    DetailsComponent,
    PosterUrlPipe,
    TextFilterPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFirestoreModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

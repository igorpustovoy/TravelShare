import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { InputComponent } from './shared/input/input.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { PhotoPanelComponent } from './home/photo-panel/photo-panel.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from "@ionic/angular";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { TravelListComponent } from './travel-list/travel-list.component';
import { PostModule } from './post/post.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PhotoPanelComponent,
    FooterComponent,
    TravelListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    IonicModule.forRoot(),
    SharedModule,
    PostModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

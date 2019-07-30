import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Globals } from './components/utils/Globals';
import { RoutingModule } from './app.routing';

import UserService from './services/user.service';
import {
  MatSidenavModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatIconModule,
  MatGridListModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { User, EditUserDialogContent } from './components/user/user.component';
import { Login } from './components/login/login.component';
import { Home } from './components/home/home.component';
import { SignUp } from './components/sign-up/sign-up.component';
import { NeedAuthGuard} from './components/utils/NeedAuthGuard';
import { HomeModule } from './components/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    SignUp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIconModule,
    RoutingModule,
    HomeModule
  ],
  providers: [UserService, NeedAuthGuard, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }

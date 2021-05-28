import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {DashboardTableComponent} from './views/dashboard-table/dashboard-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from "./angular-material/angular-material.module";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from "../environments/environment";
import {NotFoundComponent} from './views/not-found/not-found.component';
import {ToastrModule} from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { DeleteUserDialogComponent } from './views/dialogs/delete-user-dialog/delete-user-dialog.component';
import { AddUserDialogComponent } from './views/dialogs/add-user-dialog/add-user-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardTableComponent,
    NotFoundComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

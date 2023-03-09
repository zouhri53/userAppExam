import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UsersListComponent,
    UserDetailComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

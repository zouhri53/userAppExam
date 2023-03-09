import { User } from './../userModel/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  usId: string = '';
  selectedUser: User | any;
  userName: string = '';
  userLastName: string = '';
  subscriptions: Subscription = new Subscription();
  alert: string = ""

  userAccountUpdate: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    prenom: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    cp: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    ville: new FormControl('', [Validators.required]),
    fonction: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private userService: UserServicesService,
    private route: Router,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.activeroute.paramMap
        .pipe(
          tap(console.log),
          switchMap((params) => {
            return this.userService.getUserById(params.get('userId')).pipe(
              tap((user: User) => {
                this.selectedUser = user;
                this.initializeForm();
              })
            );
          })
        )
        .subscribe()
    );
  }

  onUpdate() {
    this.userService
      .updateUser(this.selectedUser._id, this.userAccountUpdate.value)
      .subscribe({
        next: res => this.userService.subject.next(res.message),
        error: err => this.userService.subject.next(err)
      });
      this.route.navigate(['/'])
  }

  deleteUser() {
    this.userService
      .DeleteUser(this.selectedUser._id)
      .subscribe({
        next: res => this.userService.subject.next(res.message),
        error: err => this.userService.subject.next(err)
      });
      this.route.navigate(['/'])
  }

  initializeForm() {
    this.userName = this.selectedUser.prenom;
    this.userLastName = this.selectedUser.nom;
    this.userAccountUpdate.setValue({
      nom: this.selectedUser.nom,
      prenom: this.selectedUser.prenom,
      adresse: this.selectedUser.adresse,
      cp: this.selectedUser.cp,
      ville: this.selectedUser.ville,
      fonction: this.selectedUser.fonction,
      phone: this.selectedUser.phone,
      email: this.selectedUser.email,
    });
  }



  closeAlert() {
    this.alert = "";
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

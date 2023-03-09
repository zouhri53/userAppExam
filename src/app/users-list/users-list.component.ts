import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { User } from './../userModel/user.model';
import { UserServicesService } from '../services/user-services.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})

export class UsersListComponent implements OnInit {
  public usersList: Observable<User[]>;

  searchUserBar = new FormGroup({
    userSearchInput: new FormControl(''),
  });


  alert: string = ""
  subscription: Subscription

  constructor(private userService: UserServicesService) {
    this.usersList = this.userService.getUsersList();
    this.subscription = this.userService.subject.asObservable().subscribe( message => this.alert = message );
  }

  ngOnInit(): void {
    this.searchUserBar
      .get('userSearchInput')!
      .valueChanges.subscribe((currentValue) => {
        this.searchUser(<string>currentValue);
      });
  }

  initializeUserList() {
    this.usersList = this.userService.getUsersList();
  }

  searchUser(searchVal: string) {
    if (searchVal.length > 0) {
      this.initializeUserList();
      this.usersList = this.usersList.pipe(
        map((us) =>
          us.filter((us) =>
            us.nom.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
          )
        )
      );
    } else {
      this.initializeUserList();
    }
  }

  closeAlert() {
      this.userService.subject.next('');
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe()
  }
}

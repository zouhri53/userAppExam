import { user } from './../userModel/user.model';
import { userServicesService } from '../services/user-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList: user[] = []
  userSearchInput: string = ''
  alert = this.userService.operationAlert

  constructor(private userService: userServicesService) { }

  ngOnInit(): void { this.initializeUserList() }

  initializeUserList()
  {
      this.usersList = this.userService.getUsersList();
  }

  searchUser()
    {
      if(this.userSearchInput.length > 0)
      {
          this.initializeUserList()
          this.usersList = this.usersList.filter(
            us => us.nom .toLocaleLowerCase()
            .includes(this.userSearchInput.toLocaleLowerCase())
            )
      }
      else
      {
          this.initializeUserList()
      }
    }

  closeAlert()
    {
          this.alert.show = false
    }

}

import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  searchUSerBar = new FormGroup({
    userSearchInput: new FormControl('')
  })
  alert = this.userService.operationAlert

  constructor(private userService: userServicesService) { }

  ngOnInit(): void { 

    this.initializeUserList()
    this.searchUSerBar.get('userSearchInput')!.valueChanges.subscribe(currentValue => {
        console.log(currentValue)
        this.searchUser(<string>currentValue)
      })

   }

  initializeUserList()
  {
      this.usersList = this.userService.getUsersList();
  }

  searchUser(searchVal:string)
    {
      if(searchVal.length > 0)
      {
          this.initializeUserList()
          this.usersList = this.usersList.filter(
            us => us.nom .toLocaleLowerCase()
            .includes(searchVal.toLocaleLowerCase())
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

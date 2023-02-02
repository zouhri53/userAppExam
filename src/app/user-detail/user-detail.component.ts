import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { userServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  usId: string = ''
  userName: string = ''
  userLastName: string = ''
  userAccountUpdate: FormGroup | any

  constructor( private userService:userServicesService, private route:Router, private activeroute:ActivatedRoute ) 
    { }

  ngOnInit(): void {

    this.activeroute.paramMap.subscribe((params) => { 
      this.usId = params.get('userId')!
    })

    this.getUserByPostedId(Number(this.usId))
    
  }

  onUpdate() {

      this.userService.updateUser(Number(this.usId),this.userAccountUpdate.value)
    
  }

  getUserByPostedId(postedId:number)
  {
      let getUser = this.userService.getUserById(postedId)
      this.userName = getUser!.prenom
      this.userLastName = getUser!.nom

      this.userAccountUpdate = new FormGroup({
        nom: new FormControl(getUser!.nom, [Validators.required,Validators.maxLength(12)]),
        prenom: new FormControl(getUser!.prenom, [Validators.required]),
        rue: new FormControl(getUser?.adresse, [Validators.required]),
        cp: new FormControl(getUser!.cp, [Validators.required, Validators.pattern("^[0-9]*$")]),
        ville: new FormControl(getUser!.ville, [Validators.required]),
        fonction: new FormControl(getUser!.fonction, [Validators.required]),
        phone: new FormControl(getUser!.phone, [Validators.required, Validators.pattern("^[0-9]*$")]),
        email: new FormControl(getUser!.email, [Validators.required,Validators.email])
    })
  }

  deleteUser()
  {
      this.userService.DeleteUser(Number(this.usId))
  }

}

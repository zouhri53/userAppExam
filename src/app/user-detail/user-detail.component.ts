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
  
  userAccountUpdate = new FormGroup({
      nom: new FormControl('', [Validators.required,Validators.maxLength(12)]),
      prenom: new FormControl('', [Validators.required]),
      rue: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      ville: new FormControl('', [Validators.required]),
      fonction: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required,Validators.email])
  })


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

      this.userAccountUpdate.controls['nom'].setValue(getUser!.nom)
      this.userAccountUpdate.controls['prenom'].setValue(getUser!.prenom)
      this.userAccountUpdate.controls['rue'].setValue(getUser!.adresse)
      this.userAccountUpdate.controls['cp'].setValue(getUser!.cp)
      this.userAccountUpdate.controls['fonction'].setValue(getUser!.fonction)
      this.userAccountUpdate.controls['ville'].setValue(getUser!.ville)
      this.userAccountUpdate.controls['phone'].setValue(getUser!.phone)
      this.userAccountUpdate.controls['email'].setValue(getUser!.email)

  }

  deleteUser()
  {
      this.userService.DeleteUser(Number(this.usId))
  }

}

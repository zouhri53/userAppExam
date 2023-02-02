import { Injectable } from '@angular/core';
import { user } from '../userModel/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class userServicesService {

  constructor(private route:Router) { }

  operationAlert = { 
      message: "",
      type: "",
      show: false
    }

  usersList:user[] = [
      new user("Zouhri","Mohammed","Adresse 01","30001","Fès","Developpeur","34539440","zouhri53@gmail.com"),
      new user("Zouhri","Mohammed","Adresse 02","30002","Fès","Designer","34539440","zouhri53@gmail.com"),
      new user("Zouhri","Mohammed","Adresse 03","30003","Fès","Ingenieur FullStack","34539440","zouhri53@gmail.com"),
      new user("Zouhri","Mohammed","Adresse 04","30004","Fès","Responsable Informatique","34539440","zouhri53@gmail.com")
    ]

  showAlert(message:string, type:string, show:boolean )
  {
    this.operationAlert.message = message
    this.operationAlert.type = type
    this.operationAlert.show = show
  }

  addUSer(data:any)
  {
      this.usersList.push(new user(data.nom,data.prenom,data.rue,data.cp,data.ville,data.fonction,data.phone,data.email))
      this.showAlert("Nouvel utilisateur ajouté avec succés.", "success", true )
      this.route.navigate(['usersList'])
  }

  updateUser(userId:number,data:any)
  {
      let userToUpdate = this.getUserById(userId)
      let indexOfUserToUpdate = this.usersList.indexOf(userToUpdate!)
      const userAfterUpdate = new user(data.nom,data.prenom,data.rue,data.cp,data.ville,data.fonction,data.phone,data.email)
      this.usersList[indexOfUserToUpdate] = userAfterUpdate
      this.showAlert("Utilisateur modifié avec succés.", "warning", true )
      this.route.navigate(['usersList'])
  }

  DeleteUser(userId:number)
  {
      let userToDelete = this.getUserById(userId)
      let indexOfUserToDelete = this.usersList.indexOf(userToDelete!)
      this.usersList.splice(indexOfUserToDelete,1)
      this.showAlert("Utilisateur supprimé avec succés.", "danger", true )
      this.route.navigate(['usersList'])
  }

  getUsersList()
  {
      return this.usersList;
  }

  getUserById(id:number)
  { 
      return this.usersList.find((obj) => {
        return obj.id === id;
      })
  }

}

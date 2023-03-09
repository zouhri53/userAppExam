import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  userAccount: FormGroup | any
  
  constructor(private userService:UserServicesService, private route:Router) { }

  ngOnInit(): void { 

      this.userAccount = new FormGroup({

        nom: new FormControl('', [Validators.required,Validators.maxLength(12)]),
        prenom: new FormControl('', [Validators.required]),
        adresse: new FormControl('', [Validators.required]),
        cp: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        ville: new FormControl('', [Validators.required]),
        fonction: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        email: new FormControl('', [Validators.required,Validators.email])

    })

  }

  getFormGroupErrors()
  {
    
      const errorsList:any = [];
      Object.keys(this.userAccount.controls).forEach(key => {
        const fgControlsErrors: ValidationErrors = (this.userAccount.get(key)?.errors) as ValidationErrors
        if (fgControlsErrors) {
          Object.keys(fgControlsErrors).forEach(keyError => {
            errorsList.push({
              'control': key,
              'error': keyError,
              'value': fgControlsErrors[keyError]
            })
          })
        }
      })

      console.log(errorsList)
  }

  onSubmit() {
      this.userService.addUSer(this.userAccount.value)
      .subscribe({
        next: res => this.userService.subject.next(res.message),
        error: err => this.userService.subject.next(err)
      });
      this.route.navigate(['/'])
  }

  clearInputs() {
      this.userAccount.reset()
  }

}

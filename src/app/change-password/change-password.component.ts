import { Component } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from '../modele/model.changePassword';
import { matchPassword } from '../new-user/matchPassword.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordFormgroup !:FormGroup
  changePassword!:ChangePassword
  message!: string;
  c!: string;
errorMessage: any;
  constructor(public authService:AuthentificationService,private fb:FormBuilder){

  }
  ngOnInit():void{

this.changePasswordFormgroup=this.fb.group({
  username:this.fb.control(null),
  current_password:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
   passwordGroup:this.fb.group({
    password:this.fb.control(null,[Validators.minLength(4),Validators.required ]),
    passwordconfirm:this.fb.control(null,[Validators.required])
    },{
     validators:matchPassword
    })
})
  }
  changePasswordUser(){
 
   // this.changePassword.username=this.authService.username
    this.changePassword.current_password=this.changePasswordFormgroup.controls['cupassword'].value
    this.changePassword.new_password=this.changePasswordFormgroup.get('passwordGroup.new_password')?.value
    this.changePassword.confirm_new_password=this.changePasswordFormgroup
    .get('passwordGroup.confrim_new_password')?.value
    console.log(this.changePassword)
   /*   this.authService.changePassword(this.changePassword).subscribe({
     next:(data)=>{
        
       // console.log(data)
       this.message="Password change  successfully "
       this.c='text-success'
        
     },error:err=>{
      this.message=err.error
       this.c='text-danger'
     }
     })
      */
   }
 
}

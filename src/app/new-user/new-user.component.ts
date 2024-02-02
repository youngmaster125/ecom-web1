import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthentificationService } from '../service/authentification.service';
import { AppUser } from '../modele/user.modele';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent {
  userFormGroup!:FormGroup
  appUser!:AppUser 
  mode:Number=0
  errorMessage:string=''
  

constructor(private fb:FormBuilder,private authService:AuthentificationService){

}

ngOnInit(): void {
this.userFormGroup=this.fb.group(
  {
    username:this.fb.control(null,[]),
    email:this.fb.control(null,[/* Validators.email */]),
    passwordGroup:this.fb.group({
    password:this.fb.control(null,[/* Validators.minLength(4),Validators.required */]),
    passwordconfirm:this.fb.control(null,/* [Validators.required] */)
    },{
     //validators:matchPassword
    })
   
  }

)



}




onSubmit() {
 
  
this.appUser= new AppUser()
this.appUser.username=this.userFormGroup.controls['username'].value
this.appUser.email=this.userFormGroup.controls['email'].value
this.appUser.password=this.userFormGroup.get('passwordGroup.password')?.value
console.log(this.appUser)
   this.authService.addUser(this.appUser).subscribe(

  {
    next:(data)=>{
console.log(data)
this.mode=1
    },error:(err)=>{
      console.log(err)
      this.errorMessage=err.error
    }
  }
)  
}
getErroMessage(fieldName: string,error: ValidationErrors):string {
  if(error['required']){
    return fieldName + " is required";
  }
  else if(error['minlength']){
    return fieldName+ " Should have at least "+ error['minlength']['requiredLength']+ " Characters"
  }else if(error['email']){
    return fieldName+ "  is incorect"
  }
  
  else if(error['min']){
    return fieldName+ " Should have min "+ error['min']['min']+""
  } else if(error['match']){
    return fieldName+ " Should have min "+ error['min']['min']+""
  }else if(error['validValidator']){
    return fieldName+ " match incorrect"
  }
  else return "";

  }

}



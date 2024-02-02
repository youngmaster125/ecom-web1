import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../modele/model.resetPassword';
import { matchPassword } from '../new-user/matchPassword.validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetPasswordComponent {
errorMessage: any;

 message:string=''
 code!:string
 c:string=''
 cc!:boolean
mode: number
emailFormGroup!: FormGroup;
resetPasswordGroup!:FormGroup 
resetPassword: ResetPassword = new ResetPassword;
constructor(private route:ActivatedRoute ,public authService:AuthentificationService,private fb:FormBuilder){
this.mode=this.authService.mode
}

ngOnInit(): void{
this.code=this.route.snapshot.params['code']

if(this.code!=null){
this.authService.verifyEmail(this.code).subscribe(
{
  next:(data:string)=>{
    console.log(data)
  
   if(data){
    this.message='Verification Succeeded'
    this.c='text-success'
    this.cc=true
   }else{
    this.message='Verification failled'
    this.c='text-danger';
   }
  },error:(err)=>{
    console.log(err)
  this.message=err.text
  this.c="text-danger"
  }
}

)
}
this.emailFormGroup=this.fb.group({
  email:this.fb.control("",[Validators.required,Validators.email]),
  otp:this.fb.control("")
})


}
sentOtpByEmail() {
  let email=this.emailFormGroup.value.email
  let otp={'email':email,code:''}
  
  this.authService.sentYourEmail(email).subscribe({
   next:(data:string)=>{
   this.message=data
   this.c='text-success'
   this.authService.mode=2
   this.emailFormGroup=this.fb.group({
    email:this.fb.control({value:email,disabled:true},[Validators.required,Validators.email],),
    otp:this.fb.control("",[Validators.required,Validators.maxLength(6),Validators.minLength(6)])
  })
   this.mode=2
   },error:(err) =>{
  if(err.status=404){  
  this.message=err.error
  this.c='text-danger'
  }else if(err.status=401){
  this.message="please check internet connection "
  this.c='text-danger'
  }
   }
  })
  
 }
 verifyCode() {
  let email=this.emailFormGroup.controls['email'].value
  let otp=this.emailFormGroup.value.otp
  this.authService.verifyOtp(email,otp).subscribe({
   next:(data)=>{
    this.message=data
    this.c='text-success'
   this.mode=3
   this.resetPasswordGroup=this.fb.group({
    email:this.fb.control({value:email,disabled:true},[ Validators.email ]),
    passwordGroup:this.fb.group({
    password:this.fb.control(null,[Validators.minLength(4),Validators.required ]),
    passwordconfirm:this.fb.control(null,[Validators.required])
    },{
     validators:matchPassword
    })
    })                  
   },error:(err) =>{
    this.message=err.error
    this.c='text-danger'
   }
  })
  
}
resetPasswordUser(){
 
   this.resetPassword.email=this.resetPasswordGroup.controls['email'].value
   this.resetPassword.password=this.resetPasswordGroup.get('passwordGroup.password')?.value
   this.resetPassword.confirmPassword=this.resetPasswordGroup.get('passwordGroup.passwordconfirm')?.value
   console.log(this.resetPassword)
    this.authService.resetPassword(this.resetPassword).subscribe({
    next:(data)=>{
       this.mode=4
      // console.log(data)
      this.message="Password reset successfully "
      this.c='text-success'
       
    },error:err=>{
      console.log(err)
    }
    })
    
  }


}

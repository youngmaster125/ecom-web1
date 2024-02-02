import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
forgetPassword() {
this.authService.mode=1
this.router.navigateByUrl("/verify")
}

  constructor(private router:Router,private authService:AuthentificationService) { }
  
  message:string=''
  ngOnInit(): void {
  }
  onSubmit(f:any){
    this.authService.login(f.username,f.password).subscribe({
     next:(data)=>{
         this.authService.loadProfile(data);
         this.router.navigateByUrl('/')
      },error:(err)=>{
         this.message='username or password incorect'
      }
    }
    )
  
  }
}

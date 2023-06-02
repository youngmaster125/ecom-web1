import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private authService:AuthentificationService) { }

  ngOnInit(): void {
  }
  onSubmit(f:any){
    this.authService.login(f.username,f.password)
    if(this.authService.userAuthentificated){
      this.authService.saveAuthentificatedUser()
      this.router.navigateByUrl("")
    }
  console.log(f)
  
  }
}

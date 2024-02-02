import { Injectable } from '@angular/core';
import { User } from '../modele/modele.user';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { AppUser } from '../modele/user.modele';
import { ValidationErrors } from '@angular/forms';
import { ResetPassword } from '../modele/model.resetPassword';
import { ChangePassword } from '../modele/model.changePassword';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  
  
 token!:string
 private url : string = environment.urlDeBaseLogin ;
 private urlDeBase : string = environment.urlDeBase 

 public isAuthentificated!:boolean
 roles :any
 mode:number=0
 username:any
 accessToken!:string
 refreshToken!:string
 public userAuthentificated!:User|undefined
  constructor(private http:HttpClient,private router:Router) {
  

   }
 /*  public login1(username:string,password:string){
  let user;
  this.users.forEach(u=>{
    if(u.username==username && u.password==password){
      user=u 
      this.token=btoa(JSON.stringify({username:u.username,roles:u.roles}))
    }
  })
  if(user){
    this.isAuthentificated=true
    this.userAuthentificated=user
    
  }else{
    this.isAuthentificated=false
    this.userAuthentificated=undefined
  }
  } */
  public login(username:string, password:string):Observable<any>{
    const body=new HttpParams()
    .set('username',username)
    .set('password',password)
    .set('grantType','password')
    .set('withRefreshToken', true)
    return this.http.post(this.url+"/token",body.toString(),
    {
      headers:new HttpHeaders()
      .set('content-type','application/x-www-form-urlencoded')
    }
    )
   }

   public addUser(appUser:AppUser):Observable<AppUser>{
    return this.http.post<AppUser>(this.url+"/new_user",appUser)
   }
   
   public refresh_token(token:any):Observable<any>{
    const body=new HttpParams()
    .set('refreshToken',token)
    .set('grantType','refreshToken')
    .set('withRefreshToken', true)
    return this.http.post(this.url,body.toString(),
    {
      headers:new HttpHeaders()
      .set('content-type','application/x-www-form-urlencoded')
    }
    )
   }
   loadProfile(data:any) {
    this.token=data
    this.isAuthentificated=true
    this.accessToken=data['accessToken']
    this.refreshToken=data['refreshToken']

    let decodedJwt:any=jwtDecode(this.accessToken)
    this.username=decodedJwt.sub
    this.roles=decodedJwt.scope
  // let  jtw_token={'accessToken':this.accessToken,'refreshToken':this.refreshToken}
    localStorage.setItem("jwt-token",JSON.stringify(data))
  }

  public isAdmin():boolean{
    if(this.isAuthentificated){
      if(this.roles.indexOf('ADMIN')>-1){
        return true
      } 
      return false
    }
    return false
  }
  public saveAuthentificatedUser(){
    localStorage.setItem('jwt-token',this.token)
  }
public loadAuthentificatedUserFromLocalStorage(){
  let token=window.localStorage.getItem('jwt-token')
  if(token){
  let token1=JSON.parse(token)
  this.loadProfile(token1)
 
  }
}
public removeAuthentificatedUserFromLocalStorage(){

  localStorage.removeItem("jwt-token")
  this.isAuthentificated=false
  this.token=''
}

logout(){
  this.removeAuthentificatedUserFromLocalStorage()
  this.router.navigateByUrl("/")
}
verifyEmail(code:string):Observable<string>{
return this.http.get<string>(this.url+"/verify?code="+code)
//http://localhost:4200/verify?code=b25a19c5-55a1-4f3f-88b3-d383a52d4e3e
}
public sentYourEmail( email:string):Observable<any>{
  return this.http.get(this.url+"/sentOtp?email="+email)
 }
 public verifyOtp( email:string,otp:string):Observable<any>{
  return this.http.get(this.url+"/verifyOtp?email="+email+"&otp="+otp)
 }
 public resetPassword(resetPassword:ResetPassword):Observable<ResetPassword>{
  return this.http.post<ResetPassword>(this.url+"/resetPassword",resetPassword)
 }
 changePassword(changePassword: ChangePassword):Observable<ChangePassword> {
  return this.http.post<ChangePassword>(this.url+"/changePassword",changePassword)
}

 getErroMessage(fieldName: string,error: ValidationErrors):string {
  if(error['required']){
    return fieldName + " is required";
  }
  else if(error['minlength']){
    return fieldName+ " Should have at least "+ error['minlength']['requiredLength']+ " Characters"
  } else if(error['maxlength']){
    return fieldName+ " Should have at most "+ error['maxlength']['requiredLength']+ " Characters"
  }
  else if(error['email']){
    return fieldName+ "  is incorect"
  }
  
  else if(error['min']){
    return fieldName+ " Should have min "+ error['min']['min']+""
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

import { Injectable } from '@angular/core';
import { User } from '../modele/modele.user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  users:User[]=[]
 token!:string
 public isAuthentificated!:boolean
 public userAuthentificated!:User|undefined
  constructor() {
   this.users=[
      {username:'user1',password:'1234',roles:['USER']},
      {username:'admin',password:'1234',roles:['ADMIN']},
      {username:'manley',password:'1234',roles:['USER','ADMIN']},
     ]

   }
  public login(username:string,password:string){
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
  }
  public isAdmin():boolean{
    if(this.userAuthentificated){
      if(this.userAuthentificated.roles.indexOf('ADMIN')>-1){
        return true
      } 
      return false
    }
    return false
  }
  public saveAuthentificatedUser(){
    localStorage.setItem('AuthUser',this.token)
  }
public loadAuthentificatedUserFromLocalStorage(){
  let t=localStorage.getItem('AuthUser')
  if(t){
  let user=JSON.parse(atob(t))
  console.log(user)
  this.userAuthentificated={username:user.username,password:user.password,roles:user.roles}
  console.log(this.userAuthentificated)
  this.isAuthentificated=true
  this.token=t
  }
}
public removeAuthentificatedUserFromLocalStorage(){

  localStorage.removeItem("AuthUser")
  this.isAuthentificated=false
  this.token='',
  this.userAuthentificated=undefined
}

}

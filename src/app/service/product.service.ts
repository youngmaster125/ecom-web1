import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { Observable } from 'rxjs';
import { Product } from '../modele/modele.product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host:string;
  constructor(private http:HttpClient,private authService:AuthentificationService) { 
    this.host="http://localhost:8080"
  }
  public getRessource(url:any):Observable<any[]>  {
    return  this.http.get<any[]>(this.host+url);
    
  }
  uploadPhotoProduct(file:File,idProduct:number):Observable<HttpEvent<{}>>{
    let formData=new FormData()
    formData.append('file',file)
    const req=new HttpRequest('POST',this.host+'/uploadPhoto/'+idProduct,formData,{
      reportProgress:true,
      responseType:"text"
    })
    return this.http.request(req)
    }
public updateProduct(url:string,p:Product):Observable<Product>{
 return  this.http.put<Product>(this.host+url,p)
 
}
public addProduct(url:string,p:Product):Observable<Product>{
  return  this.http.post<Product>(this.host+url,p)
  
 }

}

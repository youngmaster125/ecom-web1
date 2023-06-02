import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modele/modele.product';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string;
  constructor(private http:HttpClient) { 
    this.host="http://localhost:8080"


  }
  public getRessource(url:any)  {
    return  this.http.get(this.host+url);
    
  }
  public getProduct(url:any):Observable<Product>  {
    return  this.http.get<Product>(url);
    
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../modele/client.modele';
import { ProductItem } from '../modele/item-product.modele';
import { Order } from '../modele/modele.order';
//import { Product } from '../modele/modele.product';
import { CaddyService } from './caddy.service';
import { CatalogueService } from './catalogue.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
public order:Order=new Order()
  constructor(private httpClient:HttpClient,private caddyService:CaddyService
    ,private catalService:CatalogueService) { 
      
    }

    public setClient(client:Client){
     this.order.client=client
    }

    public loadProductFromCaddy(){
     
      this.order.products=[]
      let items:IterableIterator<ProductItem>|undefined=this.caddyService. getCurrentCaddy()?.items.values()
      for(let pi of items!){
       this.order.products.push(new ProductItem(pi.id,pi.product,pi.price,pi.quantity) )
    }

  }
 public submitOrder():Observable<Order>{
  return this.httpClient.post<Order>(this.catalService.host+"/orders",this.order)
 }   
 public getOrder(id:number):Observable<Order>{
  return this.httpClient.get<Order>(this.catalService.host+"/order1s/"+id)
 } 
 public myOrders(username:string):Observable<Order[]>{
  return this.httpClient.get<Order[]>(this.catalService.host+"/order1s/search/username?mc="+username)
 } 
  
 public orderDetails(url:any):Observable<any[]>  {
  return  this.httpClient.get<any[]>(url);
  
}     
}

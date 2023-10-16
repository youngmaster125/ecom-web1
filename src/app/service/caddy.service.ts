import { Injectable } from '@angular/core';
import { Caddy } from '../modele/caddy.modele';
import { Product } from '../modele/modele.product';
import { ProductItem } from '../modele/item-product.modele';
import { Client } from '../modele/client.modele';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  currentCaddyName:string='Caddy1'
  private caddies:Map<string,Caddy>=new Map()
  
  constructor() {
    
    let caddies=localStorage.getItem("myCaddies")
    
   
    if(caddies){
      let c=JSON.parse(caddies,this.reviver)
      console.log(c)
      this.caddies=c
    }else{
 
    let caddy=new Caddy(this.currentCaddyName)
    this.caddies.set(this.currentCaddyName,caddy)
    }
   }
  public addProductToCaddy(product:Product){
let caddy=this.caddies.get(this.currentCaddyName)
let productItem:ProductItem|undefined=caddy?.items.get(product.id)
if(productItem){
productItem.quantity+=product.quantity
}else{
 
      
  productItem=new ProductItem(0,product,0,0)
  productItem.id=product.id
  productItem.price=product.currentprice
  productItem.quantity=product.quantity
  productItem.product=product
  caddy?.items.set(product.id,productItem)
}

this.saveCaddy()
  }
  public removeProductToCaddy(product:Product){
    let caddy=this.caddies.get(this.currentCaddyName)
    let productItem:ProductItem|undefined=caddy?.items.get(product.id)
    if(productItem!.quantity>0){
       productItem!.quantity-=product.quantity
       if(productItem?.quantity!<=0){
        this.deleteProductToCaddy(productItem!)
       }
    }
    this.saveCaddy()
  }
  public deleteProductToCaddy(productItem:ProductItem){
    let caddy=this.caddies.get(this.currentCaddyName)
    caddy?.items.delete(productItem.id)
    this.saveCaddy()
  }
  saveCaddy(){
  
    localStorage.setItem("myCaddies",JSON.stringify(this.caddies,this.replacer))
  
  }
  setClient(client:Client){
   this.getCurrentCaddy()?.client!=client
  }
   replacer(key:string, value:any) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }
  reviver(key:string, value:any) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
  getCurrentCaddy():undefined|Caddy{
   return this.caddies.get(this.currentCaddyName)
   
  }
  getTotal():number {
    let total=0
    let items:IterableIterator<ProductItem>|undefined=this.getCurrentCaddy()?.items.values()
    for(let pi of items!){
      total+=pi.price*pi.quantity
    }
    return total
    }
    
    getTotalQuantity(){
      let total=0
      let items:IterableIterator<ProductItem>|undefined=this.getCurrentCaddy()?.items.values()
      for(let pi of items!){
        total+=pi.quantity
      }
      return total
      }
      
    

}

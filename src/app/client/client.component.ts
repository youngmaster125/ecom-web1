import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../modele/client.modele';
import { ProductItem } from '../modele/item-product.modele';
import { AuthentificationService } from '../service/authentification.service';
import { CaddyService } from '../service/caddy.service';
import { OrderService } from '../service/order.service';
import { Order } from '../modele/modele.order';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
getTS() {
return Date.now()
}

order!:Order
productItem!:ProductItem[];
onOrder() {
this.orderService.submitOrder().subscribe(data=>{
  
  this.orderService.order.id=data['id']
  this.orderService.order.date=data['date']
  localStorage.removeItem("myCaddies")
  
  
})
}
mode: number=0;

  constructor(public orderService:OrderService, private authServie:AuthentificationService,
    public caddyService:CaddyService,private router:Router,public productService :ProductService  ) { 
    
  }

  ngOnInit(): void {
  this.getPanier()
  console.log(this.productItem)
  }
  onSaveClient(client: Client) {
    client.username=this.authServie.userAuthentificated?.username!
    console.log(client.username)
     this.orderService.setClient(client)
     this.caddyService.setClient(client)
     this.orderService.loadProductFromCaddy()
     console.log(client)
     this.mode=1
  
    }
    onPayOrder(idOrder: number) {
      console.log("payment")
      this.router.navigateByUrl("/payment/"+idOrder)
      }

      getPanier(){
        this.productItem=[]
    let items:IterableIterator<ProductItem>|undefined=this.caddyService. getCurrentCaddy()?.items.values()
    for(let pi of items!){
     this.productItem.push(new ProductItem(pi.id,pi.product,pi.price,pi.quantity) )
  }

  }
      
}

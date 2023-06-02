import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../modele/item-product.modele';
import { CaddyService } from '../service/caddy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {

  productItem!:ProductItem[]
  constructor(public caddyService:CaddyService,private router:Router) { 
   
  }

  ngOnInit(): void {
  
this.getPanier()
  }

  deleteItemOnCaddies(productItem: ProductItem) {

    this.caddyService.deleteProductToCaddy(productItem)
    this.getPanier()
    console.log(this.productItem)
    
    }
  onNewOder() {
    this.router.navigateByUrl("/client")
    }
  
    getPanier(){
      this.productItem=[]
      let items:IterableIterator<ProductItem>|undefined=this.caddyService. getCurrentCaddy()?.items.values()
      for(let pi of items!){
       this.productItem.push(new ProductItem(pi.id,pi.product,pi.price,pi.quantity) )
    }
  
    }


}

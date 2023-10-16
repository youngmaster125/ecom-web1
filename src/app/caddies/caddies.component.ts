import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../modele/item-product.modele';
import { CaddyService } from '../service/caddy.service';
import { Router } from '@angular/router';
import { Product } from '../modele/modele.product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {


  productItem!:ProductItem[]
  product!:Product
  constructor(public caddyService:CaddyService,private router:Router,public productService: ProductService) { 
   
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
    onAddProductTocaddy(pi:ProductItem){
      this.product=pi.product
      this.caddyService.addProductToCaddy(this.product)
      location.reload()
      
    }
    onDecreaseQuantity(pi:ProductItem) {
      this.product=pi.product
      this.caddyService.removeProductToCaddy(this.product)
      location.reload()
      }
    getPanier(){
          this.productItem=[]
      let items:IterableIterator<ProductItem>|undefined=this.caddyService. getCurrentCaddy()?.items.values()
      for(let pi of items!){
       this.productItem.push(new ProductItem(pi.id,pi.product,pi.price,pi.quantity) )
    }
  
    }


}

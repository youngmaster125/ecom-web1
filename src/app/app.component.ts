import { Component } from '@angular/core';
import { CatalogueService } from './service/catalogue.service';
import { Router } from '@angular/router';
import { AuthentificationService } from './service/authentification.service';
import { CaddyService } from './service/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ecom-web1';
  


caddy() {
  this.router.navigateByUrl("/caddies")
  }
  
  
  login() {
    this.router.navigateByUrl("/login")
  }

     categories:any;
     currentCategory:any;
  constructor(private catelogueService:CatalogueService,private router:Router,
    public auth:AuthentificationService,
   public caddyService:CaddyService){
    }
    ngOnInit(): void {
      this.auth.loadAuthentificatedUserFromLocalStorage()
      this.getCategory()
    }
  
    private getCategory(){
      this.catelogueService.getRessource("/categories").subscribe((data: any)=>{
       this.categories=data
      },(err: any)=>{
        console.log(err)
      })
    }
    getProductsByCat(c:any){
      this.currentCategory=c
  this.router.navigateByUrl("/products/2/"+c.id)
    }
    onSelectedProducts(){
      this.currentCategory=undefined;
      this.router.navigateByUrl("/products/1/0")
    }
    onProductsPromo(){
      this.currentCategory=undefined;
      this.router.navigateByUrl("/products/3/0")
    }
    onProductsDispo(){
      this.currentCategory=undefined;
      this.router.navigateByUrl("/products/4/0")
    }
    Logout(){
     this.auth.removeAuthentificatedUserFromLocalStorage()
    }
    onsearch(mc: string) {
      this.currentCategory=undefined;
      console.log(mc)
      this.router.navigateByUrl("/products/5/"+mc.search)
      }
      orders() {
        this.router.navigateByUrl("order")
        }
  
}

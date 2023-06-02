import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
import { CaddyService } from '../service/caddy.service';
import { ProductService } from '../service/product.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Product } from '../modele/modele.product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  addCategories() {
    this.router.navigateByUrl("category")
    }
    addProducts() {
    this.router.navigateByUrl("add-products")
    }
    
      products!:any
      editPhoto:any
      currentProduct:any
      selectedFile!: FileList;
      progress!:number
     currentFileUpload:any
     tilte!:string
     timestamp=0
      constructor(public productService:ProductService,
        private route:ActivatedRoute,private router:Router,
       public authService:AuthentificationService,
       private caddyService:CaddyService) 
        { 
        
        }
    
      ngOnInit(): void {
        
        this.router.events.subscribe((val)=>{
          if(val instanceof NavigationEnd  ){
            let url=val.url
            console.log(url)
            let p1=this.route.snapshot.params['p1']
    
            if(p1==1){
              this.tilte="Les produits selectionne"
              this.getProduct("/products/search/seletectedproducts")
            
            }
            else if(p1==2){
              
            let idcat=this.route.snapshot.params['p2']
            this.tilte="Les produits de la categorie"+idcat
            this.getProduct("/categories/"+idcat+"/products")
            }
            else if(p1==3){
              this.tilte="Les produits en promotion"
              this.getProduct("/products/search/promoproducts")
              }
              else if(p1==4){
                this.tilte="Les produits disponible"
                this.getProduct("/products/search/dispoproducts")
                }
                else if(p1==5){
                  console.log(p1)
                  this.tilte="Les produits en recherche"
                  let mc=this.route.snapshot.params['p2']
                  
                  this.getProduct("/products/search/Name?mc="+mc)
                  console.log(this.products)
                  }
    
          }
        })
        let p1=this.route.snapshot.params['p1']
      
        if(p1==1){
          this.getProduct("/products/search/seletectedproducts")
          
        }  
    
      }
      public getProduct(url:string){
        this.productService.getRessource(url).subscribe({
       next:(data)=>{
        this.products=data
        
       },error:(err)=>{
        console.log(err.error)
       }
      }
        )
      }
      onEditPhoto(p:any){
    this.editPhoto=true
    this.currentProduct=p
      }
      onSelectedFile(event:Event){
        const target = event.target as HTMLInputElement;
        this.selectedFile = target.files as FileList;
        this.progress=0
        
    
      }
      upload(){
      this.progress=0
      this.currentFileUpload=this.selectedFile.item(0)
      console.log(this.currentProduct.id)
      this.productService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(
        event=>{
          if(event.type===HttpEventType.UploadProgress){
            
            this.progress=Math.round(100*event.loaded/event.total!)
            
          }else if(event instanceof HttpResponse){
           alert("photo upload")
           this.timestamp=Date.now()
           
          }
        },err=>{
         alert("Probleme de chargement"+err  )
         
        }
      )
    
      }
      getTS(){
       // return Date.now()
       return this.timestamp
      }
       onAddProductTocaddy(p:Product) {
        this.caddyService.addProductToCaddy(p)
        }
        onProductsDetails(p: Product) {
        let url =btoa(p._links.product.href);
        this.router.navigateByUrl("product-detail/"+url)
        }
    
}

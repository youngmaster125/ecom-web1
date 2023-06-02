import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../modele/modele.product';
import { AuthentificationService } from '../service/authentification.service';
import { CatalogueService } from '../service/catalogue.service';
import { ProductService } from '../service/product.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {





mode: number=0;
editPhoto:any
selectedFile!: FileList;
progress!:number
currentFileUpload:any
tilte!:string
timestamp=0
currentProduct!:Product
productFormGroup!: FormGroup;
categories: any;
  constructor(public authService:AuthentificationService,
    private route:ActivatedRoute,private router:Router
    ,private catalService:CatalogueService,public productService:ProductService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.currentProduct)
   let url=atob(this.route.snapshot.params['url'])
   console.log(url)
   this.getCategory()
   this.catalService.getProduct(url).subscribe(
   {
    next:(data)=>{
      this.currentProduct=data
      console.log(data)
      this.productFormGroup=this.fb.group({

        name:this.fb.control(this.currentProduct.name,[Validators.required]),
        description:this.fb.control(this.currentProduct.description,[Validators.required]),
        currentprice:this.fb.control(this.currentProduct.currentprice,[Validators.required]),
        available:this.fb.control(this.currentProduct.available,[Validators.required]),
        selected:this.fb.control(this.currentProduct.selected,[Validators.required]),
        promotion:this.fb.control(this.currentProduct.promotion,[Validators.required])
       
      })
    },error:(err)=>{
      console.log(err)
    }
   }
   )

  }
  onEditPhoto(p: Product) {
    this.editPhoto=true
    this.currentProduct=p

  }
  
  getTS(){
    // return Date.now()
    return this.timestamp
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
      onAddProductTocaddy() {
        throw new Error('Method not implemented.');
        }
        onEditProduct(arg0: Product) {
        this.mode=1
        }
        onUpdate() {
          let p=this.productFormGroup.value
          p.id=this.currentProduct.id
          p.photoName=this.currentProduct.photoName
          this.productService.updateProduct("/updateProduct/"+p.id,p).subscribe((data)=>{
            this.currentProduct=data
          
          alert("Produt updated")
          },(err)=>{
             console.log(err)
          }
          )
          }
          getCategory(){
            this.catalService.getRessource("/categories").subscribe(data=>{
             this.categories=data
             console.log(this.categories)
            },err=>{
              console.log(err)
            })
          }
          getErroMessage(fieldName: string,error: ValidationErrors):string {
            if(error['required']){
              return fieldName + " is required";
            }else if(error['minlength']){
              return fieldName+ " Should have at least "+ error['minlength']['requiredLength']+ " Characters"
            }else if(error['min']){
              return fieldName+ " Should have min "+ error['min']['min']+""
            }else return "";
          
            }
}

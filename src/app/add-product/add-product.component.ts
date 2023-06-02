import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Product } from '../modele/modele.product';
import { CatalogueService } from '../service/catalogue.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  currentProduct!:Product
  categories!:any
  productFormGroup!:FormGroup
  constructor(private catelogueService:CatalogueService,private productService:ProductService,
    private fb:FormBuilder) {
    this.categories=[]
   }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      category:this.fb.control(null,[Validators.required]),
      name:this.fb.control(null,[Validators.required]),
      description:this.fb.control(null,[Validators.required]),
      currentprice:this.fb.control(null,[Validators.required]),
      available:this.fb.control(false,[Validators.required]),
      selected:this.fb.control(false,[Validators.required]),
      promotion:this.fb.control(false,[Validators.required])
     
    })
    this.getCategory()
  }
  addProduct() {
    console.log(this.productFormGroup.value)
    
   let product=this.productFormGroup.value
    this.productService.addProduct("/addProduct/"+product.category,product).subscribe({
      next:(data)=>{
        this.currentProduct=data
        console.log(this.currentProduct)
        alert("Product save successfully")
      },error:err=>{
        console.log(err)
      }
    })
  console.log(product)
  
    }

   getCategory(){
      this.catelogueService.getRessource("/categories").subscribe((data: any)=>{
       this.categories=data
       console.log(this.categories)
      },(err: any)=>{
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

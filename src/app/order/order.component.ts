import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../modele/modele.order';
import { AuthentificationService } from '../service/authentification.service';
import { Router } from '@angular/router';
import { CatalogueService } from '../service/catalogue.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


 order!:any
mode:number=0;
orderItems:any;
orderDetails!:any;
  constructor(private orderService:OrderService,private auth:AuthentificationService
    ,private router:Router,private catal:CatalogueService,private http:HttpClient) { 
    this.order=[]
  }

  ngOnInit(): void {
    this.orders()
    console.log(this.orderDetails)
  }

 
  orders(){
    let username=this.auth.userAuthentificated?.username!
    console.log(username)
    this.orderService.myOrders(username).subscribe (
      {
        next:(data)=>{
          this.order=data
        },error:err=>{
          console.log(err)
        }
      }
    )
  }
  onPayOrder(idOrder: number) {
    console.log("payment")
    this.router.navigateByUrl("/payment/"+idOrder)
    }
    viewDetails(id:number) {
    
    
      /*http://localhost:8080/order1s/1/orderItems */
     
     this.orderService.orderDetails("http://localhost:8080/orderItems/search/orderDetails?id="+id).subscribe
     ({
      next:(data)=>{
        this.orderDetails=data
        console.log(this.orderDetails)
      }
     })
    
      this.mode=1
      }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../modele/modele.order';
import { Payment } from '../modele/modele.payment';
import { OrderService } from '../service/order.service';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
idOrder:number
order!:any
payment!:Payment
message:string=''
  constructor(private route:ActivatedRoute,public orderService:OrderService
    ,private paymentService:PaymentService,private router:Router) { 
    this.idOrder= this.route.snapshot.params['idOrder']
      this.order=Order
      
    console.log(this.idOrder)
  }

  ngOnInit(): void {
    this.loadOrder()
  }
  public loadOrder(){
this.orderService.getOrder(this.idOrder).subscribe(data=>{
this.order=data
console.log(this.order)
})
  }
  pay(payment:Payment){
    payment.order=this.order
    this.paymentService.savePayment(payment).subscribe({
     next: (data)=>{
       this.payment=data
       
       alert("payment effectue avec success")
       
       this.orderService.order.paid=true
       this.orderService.order=new Order()
         this.router.navigateByUrl("/order")
         
      }
    })
  }
}

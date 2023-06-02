import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../modele/modele.payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  host:string
  constructor(private httpClient:HttpClient) {
    this.host="http://localhost:8080"
   }

   public savePayment(payment:Payment):Observable<Payment>{
    return this.httpClient.post<Payment>(this.host+"/payment",payment)
   }
}

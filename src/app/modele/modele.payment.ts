import { Order } from "./modele.order"

export interface Payment{
    id:number
    datePayment:Date,
    typePayment:string,
    cardNumber:number,
    order:Order
    _links : {
        self :{
          href:string
        },
        order1 : {
          href : string
        },
        payment : {
        href :string
        },
        orderItems : {
        href :string
        },
        client : {
        href :string
        }
      }
}
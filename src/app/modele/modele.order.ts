import { Client } from "./client.modele"
import { ProductItem } from "./item-product.modele"
import { Payment } from "./modele.payment"

export class Order{
    public id!:number
    public client:Client={name:"",adresse:"",phoneNumber:"",email:"",username:""}
    public products:Array<ProductItem>=[]
    public totalAmount!:number
    public date !:Date
    public payment!:Payment
    public paid!:Boolean
    

}
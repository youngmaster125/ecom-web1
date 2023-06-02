import { Product } from "./modele.product";

export class ProductItem{
    
    constructor(public id:number,public product:Product,public price:number,public quantity:number){

    }
}
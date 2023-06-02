import { Product } from "./modele.product";



export class Category{

    constructor(public id:number,public name:string,public description:string,public photo:string
        ,public products:Product[]){

    }
}
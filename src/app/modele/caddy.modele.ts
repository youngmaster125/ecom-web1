import { Client } from "./client.modele"
import { ProductItem } from "./item-product.modele"

export class Caddy{
    constructor( name:string){
        this.name=name
    }
    public name:string
    public items:Map<number,ProductItem>=new Map()
    public client!:Client
}
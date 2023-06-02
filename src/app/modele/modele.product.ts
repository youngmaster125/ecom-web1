import { Category } from "./modele.catalogue";

export interface Product{
  id:number
  name:string
  description:string
  currentprice:number
  promotion:string
  selected:boolean
  available:boolean
  photoName:string
  category:any
  quantity:number
  _links : {
    self :{
      href:number
    },
    product : {
      href : string
    },
    category : {
    href :string
    }
  }
}




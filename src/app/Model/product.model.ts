export class ProductModel{
  productId: string;
  productName:string;
  productDesc: string;
  productImageUrl: string;
  quantityAvail: string;
  productCategory: string;

  constructor(productId: string, productName: string, productDesc: string, productImageUrl: string, quantityAvail: string, productCategory: string){
    this.productId = productId;
    this.productName = productName;
    this.productDesc = productDesc;
    this.productImageUrl = productImageUrl;
    this.quantityAvail = quantityAvail;
    this.productCategory = productCategory;
  }
}

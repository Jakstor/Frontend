import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { right } from '@popperjs/core';
import { ProductModel } from '../Model/product.model';
import { DataStorageService } from '../services/data-storage.service';
import { ProductApiCallingService } from '../services/product-api-calling.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('rightLeft',[
      state('right', style({
        transform: 'translateX(-50px)'
      })),
      state('middle', style({
        transform: 'translateX(0px)'
      })),
      transition('left => right', [animate(500)]),
      transition('middle => right', [animate(500)]),
      transition('right => left', [animate(500)]),
      transition('middle => left', [animate(500)])
    ])
  ]
})
export class HomeComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @ViewChild('mobileCards') mobileCards: ElementRef;
  constructor(private productApiCall: ProductApiCallingService, private dataStorage: DataStorageService) { }
  active1: string;
  active2: string;
  stateCheck = 'middle';
  products: ProductModel[];


  ngOnInit(): void {
    this.active1 = 'active';
    this.active2 = '';
    this.productApiCall.getAllProducts();
    this.dataStorage.getAllProducts.subscribe(
      data => {
        console.log(data);
        // for(let i=1; i<data.length; i++){
        //   console.log(data[i]);
        //   this.products.push(data[i]);
        // }
        // this.products.push(data);
        this.products = data;
      }
    )
  }

  onFC(){
    this.active1='';
    this.active2 = 'active';
  }

  onRightScrollClick(){
    this.mobileCards.nativeElement.scrollLeft += 350;
  }

  onLeftScrollClick(){
    this.mobileCards.nativeElement.scrollLeft -= 350;
  }
}

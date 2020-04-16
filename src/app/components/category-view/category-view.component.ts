import { CartsService } from './../../services/carts.service';
import { Cart } from './../../models/Cart';
import { Article } from './../../models/Article';
import { Category } from './../../models/Category';
import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {

  category : Category;
  @Input() cart : Cart;
  articles : Article[];
  userId : string;

  cartListArticle : string[];

  constructor(private navParams: NavParams, private modalController: ModalController, private cartService : CartsService) {
  }

  ngOnInit() {
    this.articles = this.category.articles;  
  }

  checkInCart(name : string) {
    return (this.cartListArticle.indexOf(name) > -1) ? true : false;
  }

  closeModal() { 
    console.log('closeModal : ',this.cart.articles);

    this.cartService.updateData(this.cart, this.userId).then(() => {
      this.modalController.dismiss({cart : this.cart}); 
    });
  }

  onInputSearch(evt){
    const searchTerm = evt.srcElement.value;
    if (!searchTerm || searchTerm.length < 3) {
      this.initializeItems();
      return;
    }

    this.articles = this.articles.filter(article => {
      if (this.slugify(article.name).indexOf(this.slugify(searchTerm)) > -1) {
        return true; 
      }
      return false;
      
    });
   }

   toggleArticleInCart(article : Article){
    let found : boolean = false;
    if(Object.prototype.hasOwnProperty.call(this.cart, 'articles')){
      this.cart.articles = this.cart.articles.filter(articleInCart => {
        console.log(article.name, articleInCart.name);
        if (article.name == articleInCart.name) {
          found = true;
          return false; 
        }
        return true;
      });
      if(!found){
        this.cart.articles.push(article);
      }
    }else{
      this.cart = new Cart(this.cart.userId, new Array(article))
    }
    console.log('toggleArticleInCart : ', this.cart);
  }

  initializeItems(): void {
    this.articles = this.category.articles;
  }

  slugify (str) {
    var map = {
        '-' : ' ',
        ' - ' : '_',
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };
    
    str = str.toLowerCase();
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
  }


}

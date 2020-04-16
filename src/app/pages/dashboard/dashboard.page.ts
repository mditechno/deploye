import { CartActionsComponent } from './../../components/cart-actions/cart-actions.component';
import { CategoryViewComponent } from './../../components/category-view/category-view.component';
import { Cart } from './../../models/Cart';
import { User } from './../../models/User';
import { CartsService } from './../../services/carts.service';
import { CategoriesService } from './../../services/categories.service';
import { Category } from './../../models/Category';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  catalogList: Category[] | any;
  categoriesSubscription : Subscription;

  cart: Cart;
  cartSubcription : Subscription;

  loader: any;
  toast: any;
  currentUser : User;
  categoryModalDismissValue : Cart | any;

  constructor(
    private modalCtrl: ModalController, 
    private categoriesService :  CategoriesService,
    private cartsService : CartsService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private actionSheetController: ActionSheetController,
    private storage : Storage) 
    {
      this.presentLoader();
      this.storage.get('user').then((val : User) => {
        if(val != null){
          this.currentUser = val;
          this.onFetchCategories();
          this.onFetchCart();
        }
      });

    }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
    this.cartSubcription.unsubscribe();
  }

  ngOnInit() {
    this.categoriesSubscription = this.categoriesService.categoriesSubject.subscribe(
      (categories: Category[]) => {
        this.catalogList = categories;
      }
    );
    this.categoriesService.emitCategories();

    this.cartSubcription = this.cartsService.cartSubject.subscribe(
      (cart: Cart) => {
        this.cart = cart;
      }
    );
    this.cartsService.emitCart();
  }

  onFetchCart() {
    this.cartsService.retrieveData(this.currentUser.id).then(
      () => {
      },
      (error) => {
      }
    );
  }

  onSaveCart() {
    this.cartsService.saveData(this.currentUser.id).then(
      () => {
      },
      (error) => {
      }
    );
  }

  onFetchCategories() {
    this.categoriesService.retrieveData().then(
      () => {
        this.loader.dismiss();
      },
      (error) => {
        this.loader.dismiss();
      }
    );
  }

  onSaveCategories() {
    this.presentLoader();
    this.categoriesService.saveData().then(
      () => {
        this.loader.dismiss();
      },
      (error) => {
        this.loader.dismiss();
      }
    );
  }

  async presentLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Chargement en cours !',
    });

    this.loader.present();
  }

  async presentCategory(category : Category, cart : Cart) {
    let cartListArticle = [];
    if(Object.prototype.hasOwnProperty.call(this.cart, 'articles')){
      for (let index = 0; index < this.cart.articles.length; index++) {
        const element = this.cart.articles[index];
        cartListArticle.push(element.name);
      }
    }

    const modal = await this.modalCtrl.create({
      component: CategoryViewComponent,
      componentProps: { category : category, cart : this.cart, userId : this.currentUser.id, cartListArticle : cartListArticle },
      backdropDismiss: true,
    });

    modal.present();
    this.cart = await (await modal.onWillDismiss()).data.cart;
  }

  async presentActions() {
    const modal = await this.modalCtrl.create({
      component: CartActionsComponent,
      componentProps: { cart : this.cart, userId : this.currentUser.id },
      backdropDismiss: true,
    });

    modal.present();
  }

  onInputSearch(evt){
    /*const searchTerm = evt.srcElement.value;
    if (!searchTerm || searchTerm.length < 3) {
      this.initializeItems();
      return;
    }

    this.articles = this.articles.filter(article => {
      if (this.slugify(article.name).indexOf(this.slugify(searchTerm)) > -1) {
        return true; 
      }
      return false;
      
    });*/
  }
}

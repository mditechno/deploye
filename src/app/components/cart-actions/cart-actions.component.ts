import { CartsService } from './../../services/carts.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Cart } from './../../models/Cart';
import { Component, OnInit, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-cart-actions',
  templateUrl: './cart-actions.component.html',
  styleUrls: ['./cart-actions.component.scss'],
})
export class CartActionsComponent implements OnInit {

  @Input() cart : Cart;
  userId : string;
  comment : string;

  constructor(
    private navParams: NavParams, 
    private modalController: ModalController, 
    private cartService : CartsService,
    private socialSharing: SocialSharing) { }

  ngOnInit() {}

  closeModal() { 
    console.log('closeModal : ',this.cart.articles);

    this.cartService.updateData(this.cart, this.userId).then(() => {
      this.modalController.dismiss(); 
    });
  }

  sendShare() {
    this.socialSharing.shareViaWhatsApp(this.comment, null, null);
  } 
}

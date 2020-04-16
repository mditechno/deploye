import { Cart } from './../models/Cart';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable()
export class CartsService {

    cart: Cart;
    cartSubject = new Subject<Cart>();
  
    emitCart() {
      this.cartSubject.next(this.cart);
    }

    createCart(cart : Cart, userId : string) {
        firebase.database().ref('carts/' + userId).set(cart);
    }

    saveData(userId : string) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('carts/' + userId).set(this.cart).then(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    updateData(cart : Cart, userId : string) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('carts/' + userId).set(cart).then(
          () => {
            resolve();
            this.emitCart();
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
    
    retrieveData(userId : string) {
        return new Promise((resolve, reject) => {
          firebase.database().ref('carts/' + userId).once('value').then(
            (data) => {
              this.cart = data.val();
              this.emitCart();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
    }
}
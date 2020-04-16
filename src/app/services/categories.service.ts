import { AngularFireDatabase } from '@angular/fire/database/database';
import { Category } from './../models/Category';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { Subject } from 'rxjs';

@Injectable()
export class CategoriesService {

    categories: Category[];
    
    categoriesSubject = new Subject<Category[]>();
  
    emitCategories() {
      this.categoriesSubject.next(this.categories);
    }

    saveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('categories').set(this.categories).then(
            (data) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
    }
    
    retrieveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('categories').once('value').then(
            (data) => {
              this.categories = data.val();
              this.emitCategories();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
    }
}
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

    signup(email: string, password: string) {
        return new Promise(
          (resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
              (user) => {
                resolve({
                  email : user.user.email.toString(),
                  id : user.user.uid.toString()
                });
              },
              (error) => {
                reject(error);
              }
            );
          }
        );
    }

    signin(email: string, password: string) {
        return new Promise(
          (resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(
              (user) => {
                resolve({
                  email : user.user.email.toString(),
                  id : user.user.uid.toString()
                });
              },
              (error) => {
                reject(error);
              }
            );
          }
        );
    }

    signout() {
        firebase.auth().signOut();
    }
}
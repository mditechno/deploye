import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabsnav',
  templateUrl: './tabsnav.page.html',
  styleUrls: ['./tabsnav.page.scss'],
})
export class TabsnavPage implements OnInit {

  constructor(private router : Router, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if(val == null){
        this.router.navigate(['/welcome']);
      }
    });
  }
}

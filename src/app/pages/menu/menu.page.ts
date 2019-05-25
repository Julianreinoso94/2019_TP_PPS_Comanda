import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';

  pages = [
    {
      title: 'Alta Dueño',
      url: '/menu/first'
    },
    {
      title: 'Second Page blank',
      url: '/menu/second'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}

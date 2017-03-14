import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { MapaPage } from '../pages/mapa/mapa';
import { PoiList } from '../pages/poiList/poiList';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LocalStorageService } from '../services/localStorageService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private localStorageService: LocalStorageService,
    private translate: TranslateService
  ) {
    this.initializeApp();

    this.localStorageService.get("lang").then(lang => {
      if (lang) {
        this.translate.use(lang);
      } else {
        var userLang = 'cs';
        // var userLang = navigator.language.split('-')[0];
        // userLang = /(en|cs)/gi.test(userLang) ? userLang : 'cs';
        this.localStorageService.set("lang", userLang);
        this.translate.use(userLang);
      }

      this.translate.setDefaultLang('cs');


      // set our app's pages
      this.pages = [
        { title: 'map', component: MapaPage },
        { title: 'places', component: PoiList }
      ];
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(page.component);
  }
}

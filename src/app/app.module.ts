import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PoiList } from '../pages/poiList/poiList';
import { PoiDetailPage } from '../pages/poiDetail/poiDetail';
import { MapaPage } from '../pages/mapa/mapa';
import { PointService } from '../services/pointService';
import { LocalStorageService } from '../services/localStorageService';
import { MemoryStorageService } from '../services/memoryStorageService';
import { APP_TRANSLATIONS } from '../app/translations';
import { TranslateLoader, TranslateModule } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable';

export class myTranslationLoader implements TranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    let result = {};
    Object.keys(APP_TRANSLATIONS).forEach(function (key) {
      result[key] = APP_TRANSLATIONS[key][lang];
    });
    return Observable.of(result);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PoiList,
    PoiDetailPage,
    MapaPage
  ],
  imports: [
    TranslateModule.forRoot({ provide: TranslateLoader, useClass: myTranslationLoader }),
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PoiList,
    PoiDetailPage,
    MapaPage
  ],
  providers: [
    PointService,
    MemoryStorageService,
    LocalStorageService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

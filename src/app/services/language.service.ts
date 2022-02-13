import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private translateService: TranslateService,
    private storage: Storage
  ) {
    this.storage.create();
  }

  LANG_KEY = 'LANGUAGE';
  langsAvailable = ['es', 'en'];
  langSelected = '';

  initializeLang() {
    const defaultLang = this.translateService.getBrowserLang();
    this.langSelected = defaultLang;
    this.translateService.setDefaultLang(defaultLang);

    this.storage.get(this.LANG_KEY).then((lang) => {
      if (lang) {
        this.setLanguage(lang);
        this.langSelected = lang;
      }
    });
  }

  getLanguages() {
    return [
      { text: 'English', value: 'en' },
      { text: 'Español', value: 'es' },
    ];
  }

  setLanguage(lang: string): void {
    this.translateService.use(lang);
    this.langSelected = lang;
    this.storage.set(this.LANG_KEY, lang);
  }
}

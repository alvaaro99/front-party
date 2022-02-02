import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService){}

  LANG_KEY = 'LANGUAGE'
  langsAvailable = ['es','en']
  langSelected = ''

  initializeLang(){
    const defaultLang = this.translateService.getBrowserLang();
    this.langSelected = defaultLang
    this.translateService.setDefaultLang(defaultLang)

    const lang = localStorage.getItem(this.LANG_KEY)
    if(lang) {
      this.setLanguage(lang)
      this.langSelected = lang
    }
    
  }

  getLanguages(){
    return [
      { text: 'English', value: 'en' },
      { text: 'Español', value: 'es' }
    ]
  }

  setLanguage(lang:string): void {
    this.translateService.use(lang)
    this.langSelected = lang
    localStorage.setItem(this.LANG_KEY,lang)
  }
}

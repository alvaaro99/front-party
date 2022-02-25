import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService, Storage],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be language set ES', async () => {
    spyOn(service['storage'], 'get')
      .withArgs(service.LANG_KEY)
      .and.resolveTo('es');
    service.setLanguage('es');
    expect(service.langSelected).toEqual('es');
    expect(await service['storage'].get(service.LANG_KEY)).toEqual('es');
  });
});

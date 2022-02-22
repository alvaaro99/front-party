import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, Storage],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be user logged', async () => {
    spyOn(service, 'validateToken').and.resolveTo(true);
    spyOn(service['storage'], 'get').and.resolveTo('real token');

    expect(await service.isUserLogged()).toBeTrue();
  });

  it('should be user no logged with expired token', async () => {
    spyOn(service, 'validateToken').and.resolveTo(false);
    spyOn(service['storage'], 'get').and.resolveTo('fake token');

    expect(await service.isUserLogged()).toBeFalse();
  });

  it('should be user no logged without token', async () => {
    spyOn(service['storage'], 'get').and.resolveTo();

    expect(await service.isUserLogged()).toBeFalse();
  });
});

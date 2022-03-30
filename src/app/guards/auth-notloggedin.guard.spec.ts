import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

import { AuthNotloggedinGuard } from './auth-notloggedin.guard';

describe('AuthNotloggedinGuard', () => {
  let guard: AuthNotloggedinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        RouterTestingModule]
    });
    guard = TestBed.inject(AuthNotloggedinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

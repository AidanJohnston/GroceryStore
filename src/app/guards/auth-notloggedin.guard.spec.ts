import { TestBed } from '@angular/core/testing';

import { AuthNotloggedinGuard } from './auth-notloggedin.guard';

describe('AuthNotloggedinGuard', () => {
  let guard: AuthNotloggedinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthNotloggedinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

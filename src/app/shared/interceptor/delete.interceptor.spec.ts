import { TestBed } from '@angular/core/testing';

import { DeleteInterceptor } from './delete.interceptor';

describe('DeleteInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DeleteInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DeleteInterceptor = TestBed.inject(DeleteInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { userServicesService } from './user-services.service';

describe('UserServicesService', () => {
  let service: userServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(userServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

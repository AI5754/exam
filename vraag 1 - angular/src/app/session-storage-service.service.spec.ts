import { TestBed } from '@angular/core/testing';

import { SessionStorageServiceService } from './session-storage-service.service';

describe('SessionStorageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionStorageServiceService = TestBed.get(SessionStorageServiceService);
    expect(service).toBeTruthy();
  });
});

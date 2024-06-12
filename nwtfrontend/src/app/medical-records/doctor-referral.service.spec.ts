import { TestBed } from '@angular/core/testing';

import { DoctorReferralService } from './doctor-referral.service';

describe('DoctorReferralService', () => {
  let service: DoctorReferralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorReferralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

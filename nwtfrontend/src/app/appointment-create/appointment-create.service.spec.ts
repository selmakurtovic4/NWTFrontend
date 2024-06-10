import { TestBed } from '@angular/core/testing';

import { AppointmentCreateService } from './appointment-create.service';

describe('AppointmentCreateService', () => {
  let service: AppointmentCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

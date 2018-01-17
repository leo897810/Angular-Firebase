import { TestBed, inject } from '@angular/core/testing';

import { Order.ServiceService } from './order.service.service';

describe('Order.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Order.ServiceService]
    });
  });

  it('should be created', inject([Order.ServiceService], (service: Order.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});

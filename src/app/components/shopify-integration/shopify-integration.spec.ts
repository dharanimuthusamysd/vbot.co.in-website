import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyIntegration } from './shopify-integration';

describe('ShopifyIntegration', () => {
  let component: ShopifyIntegration;
  let fixture: ComponentFixture<ShopifyIntegration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopifyIntegration],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopifyIntegration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

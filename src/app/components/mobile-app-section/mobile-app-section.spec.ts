import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppSection } from './mobile-app-section';

describe('MobileAppSection', () => {
  let component: MobileAppSection;
  let fixture: ComponentFixture<MobileAppSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAppSection],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileAppSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

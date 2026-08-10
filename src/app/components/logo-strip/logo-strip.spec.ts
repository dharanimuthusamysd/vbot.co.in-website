import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoStrip } from './logo-strip';

describe('LogoStrip', () => {
  let component: LogoStrip;
  let fixture: ComponentFixture<LogoStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoStrip],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoStrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCentre } from './help-centre';

describe('HelpCentre', () => {
  let component: HelpCentre;
  let fixture: ComponentFixture<HelpCentre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpCentre],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpCentre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

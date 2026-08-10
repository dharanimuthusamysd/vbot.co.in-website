import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2cIntro } from './d2c-intro';

describe('D2cIntro', () => {
  let component: D2cIntro;
  let fixture: ComponentFixture<D2cIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D2cIntro],
    }).compileComponents();

    fixture = TestBed.createComponent(D2cIntro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

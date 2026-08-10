import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureIcons } from './feature-icons';

describe('FeatureIcons', () => {
  let component: FeatureIcons;
  let fixture: ComponentFixture<FeatureIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureIcons],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureIcons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

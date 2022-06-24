import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LensFlareComponent } from './lens-flare.component';

describe('LensFlareComponent', () => {
  let component: LensFlareComponent;
  let fixture: ComponentFixture<LensFlareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LensFlareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LensFlareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

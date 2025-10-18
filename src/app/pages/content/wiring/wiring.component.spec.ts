import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiringComponent } from './wiring.component';

describe('WiringComponent', () => {
  let component: WiringComponent;
  let fixture: ComponentFixture<WiringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WiringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

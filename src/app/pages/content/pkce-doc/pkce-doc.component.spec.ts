import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkceDocComponent } from './pkce-doc.component';

describe('PkceDocComponent', () => {
  let component: PkceDocComponent;
  let fixture: ComponentFixture<PkceDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PkceDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PkceDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcDocComponent } from './oidc-doc.component';

describe('OidcDocComponent', () => {
  let component: OidcDocComponent;
  let fixture: ComponentFixture<OidcDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OidcDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OidcDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth2DocComponent } from './oauth2-doc.component';

describe('Oauth2DocComponent', () => {
  let component: Oauth2DocComponent;
  let fixture: ComponentFixture<Oauth2DocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oauth2DocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oauth2DocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

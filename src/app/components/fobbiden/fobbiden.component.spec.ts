import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FobbidenComponent } from './fobbiden.component';

describe('FobbidenComponent', () => {
  let component: FobbidenComponent;
  let fixture: ComponentFixture<FobbidenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FobbidenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FobbidenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

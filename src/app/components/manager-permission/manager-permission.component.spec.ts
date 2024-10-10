import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPermissionComponent } from './manager-permission.component';

describe('ManagerPermissionComponent', () => {
  let component: ManagerPermissionComponent;
  let fixture: ComponentFixture<ManagerPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

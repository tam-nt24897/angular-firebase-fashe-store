import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductCreateComponent } from './dashboard-product-create.component';

describe('DashboardProductCreateComponent', () => {
  let component: DashboardProductCreateComponent;
  let fixture: ComponentFixture<DashboardProductCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProductCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

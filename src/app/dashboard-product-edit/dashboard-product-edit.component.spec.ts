import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductEditComponent } from './dashboard-product-edit.component';

describe('DashboardProductEditComponent', () => {
  let component: DashboardProductEditComponent;
  let fixture: ComponentFixture<DashboardProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

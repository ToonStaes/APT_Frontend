import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerechtListComponent } from './gerecht-list.component';

describe('GerechtListComponent', () => {
  let component: GerechtListComponent;
  let fixture: ComponentFixture<GerechtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerechtListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerechtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

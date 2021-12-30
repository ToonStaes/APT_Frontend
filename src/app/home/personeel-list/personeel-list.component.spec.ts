import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneelListComponent } from './personeel-list.component';

describe('PersoneelListComponent', () => {
  let component: PersoneelListComponent;
  let fixture: ComponentFixture<PersoneelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

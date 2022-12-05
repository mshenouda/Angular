import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmailComponent } from './select-email.component';

describe('SelectEmailComponent', () => {
  let component: SelectEmailComponent;
  let fixture: ComponentFixture<SelectEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

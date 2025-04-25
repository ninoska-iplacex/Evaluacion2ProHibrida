import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaCitasItemComponent } from './lista-citas-item.component';

describe('ListaCitasItemComponent', () => {
  let component: ListaCitasItemComponent;
  let fixture: ComponentFixture<ListaCitasItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaCitasItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCitasItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

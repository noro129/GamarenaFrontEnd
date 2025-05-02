import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyFourtyEightComponent } from './twenty-fourty-eight.component';

describe('TwentyFourtyEightComponent', () => {
  let component: TwentyFourtyEightComponent;
  let fixture: ComponentFixture<TwentyFourtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwentyFourtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwentyFourtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

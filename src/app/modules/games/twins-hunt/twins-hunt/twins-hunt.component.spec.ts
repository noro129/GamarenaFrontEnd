import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwinsHuntComponent } from './twins-hunt.component';

describe('TwinsHuntComponent', () => {
  let component: TwinsHuntComponent;
  let fixture: ComponentFixture<TwinsHuntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwinsHuntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwinsHuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

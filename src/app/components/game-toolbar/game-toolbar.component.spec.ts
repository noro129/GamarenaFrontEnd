import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameToolbarComponent } from './game-toolbar.component';

describe('GameToolbarComponent', () => {
  let component: GameToolbarComponent;
  let fixture: ComponentFixture<GameToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

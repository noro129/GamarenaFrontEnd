import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatsBoardComponent } from './game-stats-board.component';

describe('GameStatsBoardComponent', () => {
  let component: GameStatsBoardComponent;
  let fixture: ComponentFixture<GameStatsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStatsBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStatsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

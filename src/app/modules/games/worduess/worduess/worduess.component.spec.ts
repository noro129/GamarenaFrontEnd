import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorduessComponent } from './worduess.component';

describe('WorduessComponent', () => {
  let component: WorduessComponent;
  let fixture: ComponentFixture<WorduessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorduessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorduessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

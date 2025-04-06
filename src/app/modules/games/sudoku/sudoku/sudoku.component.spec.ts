import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SodukoComponent } from './soduko.component';

describe('SodukoComponent', () => {
  let component: SodukoComponent;
  let fixture: ComponentFixture<SodukoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SodukoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SodukoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanDecativateDialogComponent } from './can-decativate-dialog.component';

describe('CanDecativateDialogComponent', () => {
  let component: CanDecativateDialogComponent;
  let fixture: ComponentFixture<CanDecativateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanDecativateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanDecativateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

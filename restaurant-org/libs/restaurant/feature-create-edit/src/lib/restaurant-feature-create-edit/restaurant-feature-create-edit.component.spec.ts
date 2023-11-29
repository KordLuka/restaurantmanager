import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantFeatureCreateEditComponent } from './restaurant-feature-create-edit.component';

describe('RestaurantFeatureCreateEditComponent', () => {
  let component: RestaurantFeatureCreateEditComponent;
  let fixture: ComponentFixture<RestaurantFeatureCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFeatureCreateEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantFeatureCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

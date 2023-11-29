import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantFeatureDetailsComponent } from './restaurant-feature-details.component';

describe('RestaurantFeatureDetailsComponent', () => {
  let component: RestaurantFeatureDetailsComponent;
  let fixture: ComponentFixture<RestaurantFeatureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFeatureDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

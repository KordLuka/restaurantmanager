import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RestaurantFeatureListComponent } from './restaurant-feature-list.component';
import { MockSelector, MockStore, provideMockStore } from '@ngrx/store/testing';
import { RestaurantState } from 'libs/+state/src/lib/restaurant/restaurant.reducer';
import { selectRestaurantsView } from 'libs/+state/src/lib/restaurant/restaurant.selectors';
import { RestaurantFacade } from '@restaurant-org/state';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';

let fixture: ComponentFixture<RestaurantFeatureListComponent>;
let component: RestaurantFeatureListComponent;
let mockStore: MockStore<RestaurantState>;

describe('RestaurantFeatureListComponent', () => {
  afterEach(() => {
    mockStore?.resetSelectors();
  });

  it('should display a progress bar when restaurant list is fetchingg', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: selectRestaurantsView,
        value: {
          content: undefined,
          isLoading: true,
          error: undefined,
        },
      },
    ]);
    fixture.detectChanges();

    // when
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="table-layout-progress-bar"]')
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(progressBar).toBeDefined();
  });
  it('should display an error message when fetching method threw an error', () => {
    // given
    const errorMessage = `something went wrong`;
    configureTestingModuleWithProvidedSelector([
      {
        selector: selectRestaurantsView,
        value: {
          content: undefined,
          isLoading: false,
          error: errorMessage,
        },
      },
    ]);
    fixture.detectChanges();

    // when
    const errorParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[data-testid="table-layout-error-paragraph"]')
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(errorParagraph).toBeDefined();
    expect(errorParagraph.innerHTML).toContain(errorMessage);
  });

  it('should display a table fetching method is completed', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: selectRestaurantsView,
        value: {
          content: [
            {
              id: '1',
              name: 'test',
              createdOn: new Date(),
            },
          ],
          isLoading: false,
          error: undefined,
        },
      },
    ]);
    fixture.detectChanges();

    // when
    const content: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="table-layout-content"]')
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(content).toBeDefined();
  });
  it('should display table columns', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: selectRestaurantsView,
        value: {
          content: [
            {
              id: '1',
              name: 'test',
              createdOn: new Date(),
            },
          ],
          isLoading: false,
          error: undefined,
        },
      },
    ]);
    fixture.detectChanges();

    // when
    const idColumn: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="restaurant-feature-list-id-col"]')
    )?.nativeElement;
    const nameColumn: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="restaurant-feature-list-name-col"]')
    )?.nativeElement;
    const createdOnColumn: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="restaurant-feature-list-createdOn-col"]')
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(idColumn).toBeDefined();
    expect(idColumn.innerHTML).toContain('No.');
    expect(nameColumn).toBeDefined();
    expect(nameColumn.innerHTML).toContain('Name');
    expect(createdOnColumn).toBeDefined();
    expect(createdOnColumn.innerHTML).toContain('Created on');
  });

  it('should display row for each resaturant', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: selectRestaurantsView,
        value: {
          content: [
            {
              id: '1',
              name: 'test',
              createdOn: new Date(),
            },
            {
              id: '2',
              name: 'test 2',
              createdOn: new Date(),
            },
          ],
          isLoading: false,
          error: undefined,
        },
      },
    ]);
    fixture.detectChanges();

    // when
    const rows: DebugElement[] = fixture.debugElement.queryAll(
      By.css('[data-testid="restaurant-feature-list-row"]')
    );

    // then
    expect(component).toBeTruthy();
    expect(rows.length).toBe(2);
  });
});

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    imports: [RestaurantFeatureListComponent],
    providers: [
      provideMockStore({
        selectors: selectors,
      }),
      RestaurantFacade,
    ],
  })
    .overrideComponent(RestaurantFeatureListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();

  mockStore = TestBed.inject(MockStore);
  fixture = TestBed.createComponent(RestaurantFeatureListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableLayoutComponent } from './table-layout.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { spyOn } from 'jest-mock';

let fixture: ComponentFixture<TableLayoutComponent>;
let component: TableLayoutComponent;

describe('TableLayoutComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableLayoutComponent],
      providers: [],
    })
      .overrideComponent(TableLayoutComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TableLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a progress bar', () => {
    // given
    component.isLoading = true;
    component.error = undefined;
    fixture.detectChanges();

    // when
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="table-layout-progress-bar"]')
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(progressBar).toBeDefined();
  });

  it('should display an error message', () => {
    // given
    const errorMessage = 'something went wrong';
    component.isLoading = false;
    component.error = errorMessage;
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

  it('should display an error message', () => {
    // given
    component.isLoading = false;
    component.error = undefined;
    fixture.detectChanges();

    // when
    const content: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="table-layout-content"]')
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(content).toBeDefined();
  });

  it('should emit a refresh event upon clicking the refresh button', fakeAsync(() => {
    // given
    const emitSpy = spyOn(component.refresh, 'emit');

    component.isLoading = false;
    component.error = undefined;
    fixture.detectChanges();

    const refreshButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('[data-testid="table-layout-refresh-button"]')
    )?.nativeElement;

    // when
    refreshButton.click();
    tick();

    // then
    expect(component).toBeTruthy();
    expect(refreshButton).toBeDefined();
    expect(emitSpy).toHaveBeenCalled();
  }));

  it('shouldnt emit a refresh event the refresh button is disabled', fakeAsync(() => {
    // given
    const emitSpy = spyOn(component.refresh, 'emit');

    component.isLoading = true;
    component.error = undefined;
    fixture.detectChanges();

    const refreshButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('[data-testid="table-layout-refresh-button"]')
    )?.nativeElement;

    // when
    refreshButton.click();
    tick();

    // then
    expect(component).toBeTruthy();
    expect(refreshButton).toBeDefined();
    expect(refreshButton.disabled).toBeTruthy();
    expect(emitSpy).not.toHaveBeenCalled();
  }));
});

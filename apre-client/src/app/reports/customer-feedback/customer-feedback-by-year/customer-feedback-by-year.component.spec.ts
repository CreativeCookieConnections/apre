import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerFeedbackByYearComponent } from './customer-feedback-by-year.component';
import { environment } from '../../../../environments/environment';

describe('CustomerFeedbackByYearComponent', () => {
	let component: CustomerFeedbackByYearComponent;
	let fixture: ComponentFixture<CustomerFeedbackByYearComponent>;
	let httpMock: HttpTestingController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, CustomerFeedbackByYearComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(CustomerFeedbackByYearComponent);
		component = fixture.componentInstance;
		httpMock = TestBed.inject(HttpTestingController);
		fixture.detectChanges();
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should show an error when submitting without selecting a year', () => {
		component.onSubmit();

		expect(component.errorMessage).toBe('Please select a year.');
	});

	it('should fetch and map customer feedback by year', () => {
		component.yearForm.controls['year'].setValue(2024 as any);

		component.onSubmit();

		const req = httpMock.expectOne(
			`${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-by-year?year=2024`
		);
		expect(req.request.method).toBe('GET');

		req.flush([
			{
				channels: ['Email', 'Phone'],
				ratingAvg: [[4.5], [3.8]]
			}
		]);

		expect(component.channels).toEqual(['Email', 'Phone']);
		expect(component.ratingAvg).toEqual([4.5, 3.8]);
		expect(component.tableRows).toEqual([
			{ Channel: 'Email', AverageRating: 4.5 },
			{ Channel: 'Phone', AverageRating: 3.8 }
		]);
		expect(component.errorMessage).toBe('');
	});

	it('should handle empty results for a selected year', () => {
		component.yearForm.controls['year'].setValue(2024 as any);

		component.onSubmit();

		const req = httpMock.expectOne(
			`${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-by-year?year=2024`
		);
		req.flush([]);

		expect(component.errorMessage).toBe('No data found for year 2024');
		expect(component.channels).toEqual([]);
		expect(component.ratingAvg).toEqual([]);
		expect(component.tableRows).toEqual([]);
	});
});

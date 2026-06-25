/**
 * Author: Aisha Keller
 * Date: 06/24/2026
 * File: customer-feedback-by-year.component.spec.ts
 * Description: This file contains the unit tests for the CustomerFeedbackByYearComponent class. It tests the component's functionality, including form validation, data fetching, and error handling.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerFeedbackByYearComponent } from './customer-feedback-by-year.component';
import { environment } from '../../../../environments/environment';
import it from '@angular/common/locales/it';

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

    // m-106 Week 4 Test 1: Test for form validation when no year is selected.
	it('should show an error when submitting without selecting a year', () => {
		component.onSubmit();

		expect(component.errorMessage).toBe('Please select a year.');
	});

    // m-106 Week 4 Test 2: Test for successful data fetching and mapping when a year is selected.
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

    // m-106 Week 4 Test 3: Test for handling empty results when a year is selected.
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

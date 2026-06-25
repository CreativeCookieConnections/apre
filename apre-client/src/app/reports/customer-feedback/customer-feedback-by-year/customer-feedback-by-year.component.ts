/**
 * Author: Aisha Keller
 * Date: 06/24/2026
 * File: customer-feedback-by-year.component.ts
 * Description: This file contains the CustomerFeedbackByYearComponent class, which is responsible for displaying customer feedback data by year in the application. It includes methods for fetching and processing feedback data, as well as rendering the data in a user-friendly format.
 */

// This component is part of the customer feedback reporting feature of the application. It retrieves customer feedback data from the backend service, processes it to extract relevant information, and displays it in a structured format for analysis. The component also includes error handling to manage any issues that may arise during data retrieval or processing.
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { TableComponent } from '../../../shared/table/table.component';

@Component({
    selector: 'app-customer-feedback-by-year',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, ChartComponent, TableComponent],
    template: `
    <div>
      <h1>Customer Feedback by Year</h1>

      <div class="report-container">
        <form class="form" [formGroup]="yearForm" (ngSubmit)="onSubmit()">
          @if (errorMessage) {
            <div class="message message--error">{{ errorMessage }}
            </div>
          }

          <div class="form__group">
            <label class="label" for="year">Year</label>
            <select class="select" id="year" formControlName="year" name="year">
              @for (year of years; track year) {
                <option [value]="year">{{ year }}</option>
              }
            </select>
          </div>

          <div class="form__actions">
            <button class="button button--primary" type="submit">Submit</button>
          </div>
        </form>

      @if (channels.length && ratingAvg.length) {
        <div class="card chart-card">
          <app-chart
            [type]="'bar'"
            [label]="'Customer Feedback by Channel'"
            [labels]="channels"
            [data]="ratingAvg">
          </app-chart>
        </div>

        <div class="card table-card">
          <app-table
            [title]="'Customer Feedback by Channel'"
            [headers]="tableHeaders"
            [data]="tableRows"
            [sortableColumns]="sortableColumns"
            [recordsPerPage]="5"
            [headerBackground]="'primary'">
          </app-table>
        </div>
      }
    </div>
    `,
  styles: `
    .report-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .form, .chart-card, .table-card {
      width: 70%;
      margin: 20px 0;
    }

    .chart-card {
      min-height: 420px;
    }
  `

})
export class CustomerFeedbackByYearComponent {
  channels: string[] = [];
  ratingAvg: number[] = [];
  years: number[] = [];
  errorMessage = '';

  tableRows: {Channel: string; AverageRating: number}[] = [];
  tableHeaders: string[] = ['Channel', 'AverageRating'];
  sortableColumns: string[] = ['Channel', 'AverageRating'];

  yearForm = this.fb.group({
  year: [null, Validators.required]
  });

  constructor(private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.years = this.loadYears();
  }

  loadYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  }

  onSubmit(): void {
    if (this.yearForm.invalid) {
      this.errorMessage = 'Please select a year.';
      return;
    }

const year = this.yearForm.controls['year'].value;

this.http
  .get<any[]>(`${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-by-year?year=${year}`)
  .subscribe({
    next: (data) => {
      if (!data || data.length === 0) {
        this.errorMessage = `No data found for year ${year}`;
        this.channels = [];
        this.ratingAvg = [];
        this.tableRows = [];
        return;
      }

      const payload = data[0];
      this.channels = payload.channels ?? [];

      const rawRatings = payload.ratingAvg ?? [];
      this.ratingAvg = rawRatings.map((value: any) =>
        Array.isArray(value) ? Number(value[0] ?? 0) : Number(value)
      );

      this.tableRows = this.channels.map((channel, index) => {
        const rating = Number(this.ratingAvg[index] ?? 0);
        return {
          Channel: channel,
          AverageRating: Math.round(rating * 100) / 100
        };
      });

      this.errorMessage = '';
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error fetching customer feedback by year:', err);
      this.errorMessage = 'Unable to fetch customer feedback data';
    }
  });
  }
}

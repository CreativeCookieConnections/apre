<h1>Week 3 Major Change</h1>

<h3>Major Task: M-090</h3>
<h2>Agent Performance by Metric Type</h2>
<p>Create an API to fetch agent performance data by metric type and build an Angular component to display agent performance by metric type using ChartComponent or TableComponent with 3 unit tests each.</p>

<h2>File Updates</h2>
<ul>
  <li>apre/apre-server/src/routes/reports/agent-performance/index.js</li>
  <li>apre/apre-server/test/routes/reports/agent-performance/index.spec.ts</li>
  <li>apre/apre-client/src/app/reports/agent-performance/agent-performance-by-metric/agent-performance-by-metric.component.ts</li>
  <li>apre/apre-client/src/app/reports/agent-performance/agent-performance-by-metric/agent-performance-by-metric.component.spec.ts</li>
  <li>apre/apre-client/src/app/app.routes.ts</li>
</ul>

<h2>Details</h2>
<ul>
  <li>Created a new endpoint (API). Validates metricType, validates startDate and endDate, queries agentPerformance collection, and joins with agents. Returns agents array, values array, and metric type.</li>
  <li>Created the Angular Component: Created the agent-performance-by-metric folder with the agent-performance-by-metric.component.ts and the agent-performance-by-metric.component.spect.ts files.</li>
  <li>Applied a component that allows users to select a metric type and date range to view agent performance data in both chart and table formats. Fetches data from the backend API based on user selections and displays the data accordingly.</li>
  <li>Unit tests were applied to the Angular component agent-performance.component.spec.ts to test the functionality of the AgentPerformanceByMetricComponent. Tests cover the creation of a component, the display of a title, the update of metricType, and the behavior when metricType is not selected.</li>
  <li>Applied the correct routes to the apre/apre-client/src/app/app.routes.ts</li>
</ul>

<h2>Testing</h2>
<ul>
  <li> apre-client tests: passed</li>
  <li> apre-server tests: passed</li>
</ul>

<br>

<h1>Week 4 Minor Change</h1>

<h3>Minor Task: m-024</h3>
<h2>Add Placeholder Text "Select Region"</h2>
<p>Add a Placeholder to the region label in the SalesByRegionTabularComponent. Placeholder text should be "Select Region."</p>

<h2>File Updates</h2>
<ul>
  <li>apre/apre-client/src/app/reports/sales/sales-by-region-tabular/sales-by-region-tabular.component.ts</li>
</ul>

<h2>Details</h2>
<ul>
  <li>Identified the correct file to make the Minor Development Task change.</li>
  <li>Identified the correct line placement to implement the placeholder in the SalesByRegionTabularComponent.</li>
  <li>Code was implemented: Line 18 Code Comment. Line 19 Placeholder.</li>
</ul>

<h2>Testing</h2>
<ul>
  <li>Tests Passed, and the application is viewed as running with the placeholder added.</li>
</ul>

<br>

<h1>Week 4 Major Changes </h1>

<h3>Major Task: M-106</h3>
<h2>Customer Feedback by Year</h2>
<p>Create an API to fetch Customer Feedback data by Year and build an Angular component to display Customer Feedback data by Year using ChartComponent or TableComponent with 3 Unit Tests each.</p>

<h2>Files Added or Updated</h2>
<ul>
  <li> (Updated): apre/apre-server/src/routes/reports/customer-feedback/index.js</li>
  <li> (Updated): apre/apre-server/test/routes/reports/customer-feedback/index.spec.js</li>
  <li> (Added): apre/apre-client/src/app/reports/customer-feedback/customer-feedback-by-year/customer-feedback-by-year.component.ts </li>
  <li> (Added): apre/apre-client/src/app/reports/customer-feedback/customer-feedback-by-year/customer-feedback-by-year.component.spec.ts </li>
  <li> (Updated): apre/apre-client/src/app/app.routes.ts </li>
  <li> (Updated): apre/apre-client/src/app/layouts/main-layout/main-layout. component.ts</li>
</ul>

<h2>Details</h2>
<ul>
  <li> Updated the index.js file under customer-feedback to create an API endpoint that GETs customer feedback data by year.</li>
  <li> Updated the index.spec.js file in the customer-feedback folder to create 3 corresponding unit tests that test the functionality of the API endpoint that GETS customer feedback data by year. </li>
  <li> Added a customer-feedback-by-year.component.ts file to implement the Angular Component to display customer feedback by year. Created the chart and table to showcase data.</li>
  <li> Added a customer-feedback-by-year.component.spec.ts file to create 3 corresponding unit tests for the new CustomerFeedbackByYear component.</li>
  <li> Updated the app.routes.ts file to wire everything together.</li>
  <li> Updated the main-layout to update the application's sidebar to include the CustomerFeedbackByYear component listed under Customer Feedback.</li>
  <li> Validated all 6 Unit tests to be passing.</li>
  <li> Validated that the application is working, and the Customer Feedback By Year is responsive. The chart renders with channel labels and rating values. The styling is consistent with existing report pages. The year in 2023 responds with data, while other years do not. </li>

  <h2>Testing</h2>
  <ul>
    <li> Conducted test through VSC terminal to verify Unit Tests have passed.</li>
    <li> Verified the application is functioning correctly by running the server and client together and signing into the application.</li>
  </ul>
</ul>

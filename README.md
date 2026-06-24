<h1>Week 3 Major Change</h1>
<br>

<h3>Major Task: M-090</h3>
<h2>Agent Performance by Metric Type</h2>
<p>Create an API to fetch agent performance data by metric type and build an Angular component to display agent performance by metric type using ChartComponent or TableComponent with 3 unit tests each.</p>

<h2>Updates</h2>
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

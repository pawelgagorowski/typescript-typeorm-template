import client from 'prom-client';

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code']
});

export const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processed requests'
});

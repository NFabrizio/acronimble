import React from 'react';
import Button from '@material-ui/core/Button';

const ErrorView = ({ onRetry }) => (
  <div style={{ textAlign: 'center' }}>
    <p>Something went wrong fetching the data</p>
    <Button variant="outlined" onClick={onRetry}>
      Retry
    </Button>
  </div>
);

export default ErrorView;
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = () => (
  <div style={{ textAlign: 'center' }}>
    <CircularProgress />
  </div>
);

export default LoadingSpinner;
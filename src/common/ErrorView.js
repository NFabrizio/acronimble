import React from 'react';

const ErrorView = ({ onRetry }) => (
  <div>
    Uh oh
    <button type="button" onClick={onRetry}>
      Retry
    </button>
  </div>
);

export default ErrorView;
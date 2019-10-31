import React from 'react';
import { Router } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import history from '../../src/utils/history';

const renderWithProvider = (
  node,
  { ...options } = {},
) => {
  const rendered = rtlRender(
    <div id="root">
      <Router history={history}>
        {React.cloneElement(node, { history, location: history.location })}
      </Router>
    </div>,
    options
  );

  return {
    ...rendered,
    rerender: (ui, options) => renderWithProvider(ui, {container: rendered.container, ...options})
  }
};

export * from '@testing-library/react';
export { renderWithProvider };

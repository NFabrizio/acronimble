import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AcronymLike from '../AcronymLike';
import history from '../utils/history';

test('likes an acronym if user is logged in', () => {
  const like = jest.fn();
  const { getByText, debug, getByTestId } = render(<AcronymLike isAuthenticated like={like} likes={[]} />);
  const button = getByText(/click/i);

  fireEvent.click(button);
  expect(like).toHaveBeenCalledTimes(1);
});

test('redirects if user is not logged in', () => {
  const spy = jest.spyOn(history, 'push');
  const like = jest.fn();
  const { getByText, debug, getByTestId } = render(<AcronymLike like={like} likes={[]} />);
  const button = getByText(/click/i);

  fireEvent.click(button);
  expect(like).toHaveBeenCalledTimes(0);
  expect(history.push).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});

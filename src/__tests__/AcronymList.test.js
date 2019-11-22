import get from 'lodash/get';
import React from 'react';
import AcronymList from '../AcronymList';
import { fireEvent, renderWithProvider, wait, within } from '../../test/helpers/testProvider';

let acronymsList;

beforeEach(() => {
  // Reset mocks called with spyOn
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.resetModules();

  acronymsList = [
    {
      _id: '5ad8e4f768b2654e59a4a512',
      acronym: 'NG',
      definitions: [
        {
          name: 'Next Gen',
          description: 'The current stage of Pearson products',
          categories: ['5ad8e4c668b2654e59a4a511'],
          id: 'df3e65ae0000000000000000',
          owner: 'auth0|5ad8aea541aacd1daa890d5a',
          likes: ['auth0|5ad8aea541aacd1daa890d5a']
        }
      ],
      owner: 'auth0|5ad8aea541aacd1daa890d5a'
    }
  ];
});

test('rendering no results', () => {
  const { getByText } = renderWithProvider(<AcronymList />);
  expect(getByText(/no results found/i)).toBeTruthy();
});

test('rendering list of acronyms', () => {
  const { getByText } = renderWithProvider(
    <AcronymList list={acronymsList} like={() => {}} isAuthenticated likesIds={[]} />
  );
  const acronymName = get(acronymsList, '0.acronym', '');
  expect(getByText(acronymName)).toBeTruthy();
});

test('rendering definition and name of acronym with most likes when acronym has multiple definitions', () => {
  acronymsList[0].definitions.push({
    name: 'New Gen',
    description: 'The old stage of Pearson products',
    categories: ['5ad8e4c668b2654e59a4a511'],
    id: 'df3e65ae0000000000000000',
    owner: 'auth0|5ad8aea541aacd1daa890d5a',
    likes: ['auth0|5ad8aea541aacd1daa890d5a', 'auth0|5ad8aea541aacd1daa890d5a-2']
  });
  const { getByText, queryByText } = renderWithProvider(
    <AcronymList list={acronymsList} like={() => {}} isAuthenticated likesIds={[]} />
  );
  const acronymFirstDefName = get(acronymsList, '0.definitions.0.name', '');
  const acronymSecondDefName = get(acronymsList, '0.definitions.1.name', '');
  const firstDef = queryByText(acronymFirstDefName);

  expect(firstDef).toBeNull();
  expect(getByText(acronymSecondDefName)).toBeTruthy();
});

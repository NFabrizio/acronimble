import axios from 'axios';
import React from 'react';
import AddAcronym from '../AddAcronym';
import history from '../utils/history';
import { fireEvent, renderWithProvider, wait, within } from '../../test/helpers/testProvider';

jest.mock('axios');
const industry = 'industry term';
const company = 'company term';
const resp = {
  data: [
    {_id: '5ad8e30768b2654e59a4a50d', categoryName: industry},
    {_id: '5ad8e30e68b2654e59a4a50e', categoryName: company}
  ]
};
axios.get.mockResolvedValue(resp);
axios.post.mockResolvedValue('');

beforeEach(() => {
  // Reset mocks called with spyOn
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.resetModules();
});

test('renders loading state', () => {
  const { getByText } = renderWithProvider(
    <AddAcronym />
  );

  expect(getByText(/loading/i)).toBeTruthy();
});

test('populates categories for dropdown', async() => {
  const { getByLabelText, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/categories/i)).toBeTruthy());

  const categoryDropdown = getByLabelText(/categories/i);
  fireEvent.click(categoryDropdown.parentNode.firstChild);

  expect(getByText(industry)).toBeTruthy();
  expect(getByText(company)).toBeTruthy();
});

test('updates with changes to acronym field', async() => {
  const newAcronym = 'WTF';
  const { getByLabelText, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/acronym/i)).toBeTruthy());

  const acronymField = getByLabelText(/acronym/i);
  fireEvent.change(acronymField, { target: { value: newAcronym } });

  expect(acronymField.value).toBe(newAcronym);
});

test('updates with changes to name field', async() => {
  const newName = 'Wednesday Thursday Friday';
  const { getByLabelText, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/name/i)).toBeTruthy());

  const nameField = getByLabelText(/name/i);
  fireEvent.change(nameField, { target: { value: newName } });

  expect(nameField.value).toBe(newName);
});
test('updates with changes to definition field', async() => {
  const newDef = 'Either Wednesday, Thursday or Friday';
  const { getByLabelText, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/definition/i)).toBeTruthy());

  const defField = getByLabelText(/definition/i);
  fireEvent.change(defField, { target: { value: newDef } });

  expect(defField.value).toBe(newDef);
});

test('displays selected categories', async() => {
  const { getByLabelText, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/categories/i)).toBeTruthy());

  const categoryDropdown = getByLabelText(/categories/i);
  fireEvent.click(categoryDropdown.parentNode.firstChild);

  const industryOption = getByText(industry);
  const companyOption = getByText(company);

  expect(industryOption).toBeTruthy();
  expect(companyOption).toBeTruthy();

  fireEvent.click(industryOption);

  expect(within(categoryDropdown.parentNode).getByText(industry)).toBeTruthy();
});

test('does not submit if required field is missing', async() => {
  const pushSpy = jest.spyOn(history, 'push');
  const newAcronym = 'WTF';
  const newName = 'Wednesday Thursday Friday';
  const newDef = 'Either Wednesday, Thursday or Friday';
  const { getByLabelText, getByTestId, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/acronym/i)).toBeTruthy());

  const acronymField = getByLabelText(/acronym/i);
  const submitButton = getByTestId(/submit-button/i);
  fireEvent.change(acronymField, { target: { value: newAcronym } });
  fireEvent.click(submitButton);

  expect(pushSpy).not.toHaveBeenCalled();

  const nameField = getByLabelText(/name/i);
  fireEvent.change(acronymField, { target: { value: '' } });
  fireEvent.change(nameField, { target: { value: newName } });
  fireEvent.click(submitButton);

  expect(pushSpy).not.toHaveBeenCalled();

  const defField = getByLabelText(/definition/i);
  fireEvent.change(nameField, { target: { value: '' } });
  fireEvent.change(defField, { target: { value: newDef } });
  fireEvent.click(submitButton);

  expect(pushSpy).not.toHaveBeenCalled();

  fireEvent.change(nameField, { target: { value: newName } });
  fireEvent.click(submitButton);

  expect(pushSpy).not.toHaveBeenCalled();

  fireEvent.change(nameField, { target: { value: '' } });
  fireEvent.change(acronymField, { target: { value: newAcronym } });
  fireEvent.change(defField, { target: { value: newDef } });
  fireEvent.click(submitButton);

  expect(pushSpy).not.toHaveBeenCalled();

  fireEvent.change(nameField, { target: { value: newName } });
  fireEvent.change(acronymField, { target: { value: newAcronym } });
  fireEvent.change(defField, { target: { value: '' } });
  fireEvent.click(submitButton);

  expect(pushSpy).not.toHaveBeenCalled();
});

test('does submit if all required fields are present and takes user back to home page', async() => {
  // const postMock = jest.spyOn(axios, 'post');
  const newAcronym = 'WTF';
  const newName = 'Wednesday Thursday Friday';
  const newDef = 'Either Wednesday, Thursday or Friday';
  const { getByLabelText, getByTestId, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/acronym/i)).toBeTruthy());

  const acronymField = getByLabelText(/acronym/i);
  const nameField = getByLabelText(/name/i);
  const defField = getByLabelText(/definition/i);
  const submitButton = getByTestId(/submit-button/i);
  fireEvent.change(acronymField, { target: { value: newAcronym } });
  fireEvent.change(nameField, { target: { value: newName } });
  fireEvent.change(defField, { target: { value: newDef } });
  fireEvent.click(submitButton);

  expect(axios.post).toHaveBeenCalled();
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith('/acronyms', expect.objectContaining({
    acronym: newAcronym,
    definitions: [{
      categories: [],
      description: newDef,
      name: newName
    }]
  }));
});

test('returns user to home page on cancel button click', async() => {
  const pushSpy = jest.spyOn(history, 'push');
  const { getByTestId, getByText } = renderWithProvider(
    <AddAcronym />
  );
  await wait(() => expect(getByText(/acronym/i)).toBeTruthy());

  const cancelButton = getByTestId(/cancel-button/i)
  fireEvent.click(cancelButton);

  expect(pushSpy).toHaveBeenCalled();
  expect(pushSpy).toHaveBeenCalledTimes(1);
  expect(pushSpy).toHaveBeenCalledWith('/');
});

import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import App from './App';
import * as dataService from './dataService';

jest.mock('./dataService');

describe('App tests', () => {
  it('Shows loading when data not (yet) fetched', async () => {
    let wrapper = undefined;

    await act(async () => {
      wrapper = mount(<App />);
    });

    expect(wrapper.text()).toMatch(/^Loading/);
  });

  it('Shows message when data fetched', async () => {
    const message = 'Get in!';
    dataService.fetchData.mockResolvedValue({ message });

    let wrapper = undefined;

    await act(async () => {
      wrapper = mount(<App />);
    });

    expect(wrapper.text()).toEqual(message);
  });
});

import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import App from './App';
import * as dataService from './dataService';

jest.mock('./dataService');

describe('App tests', () => {
  it('Triggers fetch on mount', async () => {
    await act(async () => {
      mount(<App />);
    });

    expect(dataService.fetchData).toHaveBeenCalledTimes(1);
  });

  it('Shows loading message during data fetch', async () => {
    const message = 'Groovy!';
    let wrapper = undefined;
    let dataResolve;

    dataService.fetchData.mockImplementationOnce(() => new Promise(resolve => {
      dataResolve = resolve;
    }));

    await act(async () => {
      wrapper = mount(<App />);
    });
    expect(wrapper.text()).toMatch(/^Loading/);

    await act(async () => {
      dataResolve({ message });
    });
    expect(wrapper.text()).toEqual(message);
  });

  it('Shows data when fetch is successful', async () => {
    const message = 'Get in!';
    dataService.fetchData.mockResolvedValueOnce({ message });

    let wrapper = undefined;

    await act(async () => {
      wrapper = mount(<App />);
    });

    expect(wrapper.text()).toEqual(message);
  });

  it('Shows error message when data fetch fails', async () => {
    dataService.fetchData.mockRejectedValueOnce(new Error('Boom!'));

    let wrapper = undefined;

    await act(async () => {
      wrapper = mount(<App />);
    });
    wrapper.update(); // Yikes!!

    expect(wrapper.find('.error').exists()).toBe(true);
  });

  it('Should show error message when data fetch fails, but Enzyme is misbehaving!', async () => {
    dataService.fetchData.mockRejectedValueOnce(new Error('Boom!'));

    let wrapper = undefined;

    await act(async () => {
      wrapper = mount(<App />);
    });

    await act(async () => {
      // These are NOT in agreement, which seems to indicate that
      // (a) ReactWrapper is internally using different objects for different function calls, and
      // (b) Enzyme is getting out of sync, due to react Hooks.
      //
      // This is as expected ...
      console.log(`wrapper.text() => \n${wrapper.text()}`);
      // ... and so is this ...
      console.log(`wrapper.html() => \n${wrapper.html()}`);
      // ... but debug() returns the previous render tree ...
      console.log(`wrapper.debug() => \n${wrapper.debug()}`);
      // ... and find() is broken ...
      console.log(`wrapper.find('.error').exists() => \n${wrapper.find('.error').exists()}`);
      // ... and exists() is broken too!
      console.log(`wrapper.exists('.error') => \n${wrapper.exists('.error')}`);
    });

    // Expectation will fail without this call to wrapper.update() ... Woooonderful.
    wrapper.update();
    expect(wrapper.exists('.error')).toBe(true);
  });
});

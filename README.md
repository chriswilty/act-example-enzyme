# Testing with React Hooks and Enzyme

[React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks) officially
introduced Hooks, and everyone celebrated the death of javascript classes!
Only joking, Typescript fans. Jeez, so touchy.

Hooks are great, but the React community was not fully prepared for all their knock-on effects.
These included a funky new API for wrapping _some of_ our test code, which a quick websearch shows
[caused some considerable confusion](https://duckduckgo.com/?q=react+testing+act+warnings+enzyme),
not least because an asynchronous flavour of `act` was not provided for working with, say, hooks
that trigger a data fetch. Async `act` arrived later on (asynchronously, you might say) with
[React 16.9](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing).

This repo is a teeny tiny example of some [Enzyme](https://airbnb.io/enzyme/docs/api/) component
tests that use `act` to wrap code that trigger hooks that do things asynchronously on updates.
If I get around to it, I'll make an almost identical copy of this repo using
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro) instead of
Enzyme. As an aside, RTL is pretty damn opinionated about how we should be writing our tests, but
I'll save that discussion for another day.

-----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project root, you can run:

#### `yarn start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To be honest there's very little to see, but at least you'll know what we are testing.

#### `yarn test`

Launches the test runner in interactive watch mode.  
See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

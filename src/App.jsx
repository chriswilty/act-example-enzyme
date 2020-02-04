import React, { useEffect, useState } from 'react';

import { fetchData } from './dataService';

import './App.css';

const App = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const doFetch = async () => {
    try {
      const someData = await fetchData();
      setData(someData);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    // In a real app we'd use React Suspense.
    doFetch();
  }, []);

  return (
    <div className="App">
      { data
          ? <div>{data.message}</div>
          :
          error
              ? <div className="error">Shoot, something went wrong :(</div>
              : <div>Loading ....</div>
      }
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';

import { fetchData } from './dataService';

import './App.css';

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const someData = await fetchData();
      setData(someData);
    })();
  }, []);

  return (
    <div className="App">
      {
        data
            ? <div>{data.message}</div>
            : <div>Loading ....</div>
      }
    </div>
  );
};

export default App;

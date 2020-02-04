const fetchData = async () => new Promise(resolve => {
  setTimeout(
      () => resolve({ message: 'Data fetched \uD83C\uDF89' }),
      1500
  );
});

export { fetchData }

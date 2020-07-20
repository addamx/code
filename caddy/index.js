fetch("http://127.0.0.1:9311/api")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
  });

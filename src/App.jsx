import React from 'react';
import axios from 'axios';
function App() {
  axios({
    method: 'get',
    url: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
    params: { id: 2 }
  })
    .then(response => {
      // manipular dados de resposta
      console.log(response);
    })
    .catch(err => {
      // manipular erros
      console.log(err);
    });
  return (
    <p>Teste com API Axios</p>
  );
}
export default App;

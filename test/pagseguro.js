function criarCheckout() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 54ACACF08B744AD5AB020FC32B923CBB"); // Insira seu token de sandbox aqui
  myHeaders.append("accept", "application/json");
  myHeaders.append("content-type", "application/json");

  const raw = JSON.stringify({
      "reference_id": "1",
      "customer": {
          "name": "João da Silva", 
          "email": "joao.silva@example.com", 
          "tax_id": "12345678909" 
      },
      "items": [
          {
              "reference_id": "1",
              "name": "miniatura",
              "description": "miniatura de ação",
              "quantity": 1,
              "unit_amount": 5000 
          }
      ],
      "redirect_url": "http://127.0.0.1:5500/success.html" 
  });

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  fetch("https://sandbox.api.pagseguro.com/charges", requestOptions) 
      .then(response => {
          if (!response.ok) {
              throw new Error('resposta não foi boa');
          }
          return response.json();
      })
      .then(result => {
          const payLink = result.links.find(link => link.rel === "PAY").href;
          console.log("Link de pagamento:", payLink);
          window.location.href = payLink; 
      })
      .catch(error => console.error('Ocorreu um problema:', error));
}

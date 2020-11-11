import React, { useState } from "react";
import "./App.css";

const credentials = require("./credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const idSheet = "17P1cdg-Yiu6fB7P1IXtKI2z9x3o0G_mnFuxqmaoVxGc";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [email, setEmail] = useState("");

  var data = {
    name,
    phone,
    cellPhone,
    email,
  };

  async function connectToApi(e) {
    function limpar() {
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("cellphone").value = "";
      document.getElementById("email").value = "";
    }

    if (!data.name) {
      return alert("O nome precisa ser digitado");
    } else if (!data.phone && !data.cellPhone && !data.email) {
      return alert("Informe pelo menos um contato(Telefone/Celular/Email)");
    } else {
      e.preventDefault();
      const file = new GoogleSpreadsheet(idSheet);
      await file.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      });
      await file.loadInfo();
      const sheet = file.sheetsByIndex[0];
      await sheet.addRow({
        name: `${data.name}`,
        phone: `${data.phone}`,
        cellphone: `${data.cellPhone}`,
        email: `${data.email}`,
        date: new Date(),
      });

      limpar();

      alert("Registro Salvo com sucesso");
    }
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Contato</h1>
        <label>Nome</label>
        <input
          type="text"
          id="name"
          onChange={(event) => setName(event.target.value)}
        />
        <label>Telefone</label>
        <input
          type="text"
          id="phone"
          onChange={(event) => setPhone(event.target.value)}
        />
        <label>Celular</label>
        <input
          type="text"
          id="cellphone"
          onChange={(event) => setCellPhone(event.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" onClick={connectToApi}>
          ENVIAR
        </button>
      </form>
    </div>
  );
}

export default App;

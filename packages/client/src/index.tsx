import { Router } from "@reach/router";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import client from "./apollo-client";
import { createGlobalStyle } from "styled-components";

import Home from "./pages/Home";
import PokemonPage from "./pages/Pokemon";
import Header from "./components/Header/Header";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
`;

const Root = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Header />
    <Router>
      <Home path="/" />
      <PokemonPage path="/pokemon/:name" />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

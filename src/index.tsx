import * as React from "react";
import * as ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import registerServiceWorker from "./registerServiceWorker";

import { fragmentMatcher } from "./utils/fragmentMatcher";
import { Routes } from "./routes";

import "./index.css";
 
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_HOST,
      credentials: "include"
    })
  ]),
  cache: new InMemoryCache({ fragmentMatcher })
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(WrappedApp, document.getElementById("root") as HTMLElement);
registerServiceWorker();

import React from 'react'
import ReactDOM from 'react-dom/client'
import {MantineProvider} from "@mantine/core"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from './App'


const apolloClient = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>,
)

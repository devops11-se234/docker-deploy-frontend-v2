import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

const configuredGraphqlUri = import.meta.env.VITE_GRAPHQL_URI?.trim()
const backendPort = import.meta.env.VITE_BACKEND_PORT?.trim() || '8083'
const fallbackGraphqlUri =
  typeof window === 'undefined'
    ? `http://localhost:${backendPort}/graphql`
    : `${window.location.protocol}//${window.location.hostname}:${backendPort}/graphql`

const httpLink = new HttpLink({
  uri: configuredGraphqlUri || fallbackGraphqlUri,
})

const cache = new InMemoryCache({
  addTypename: false, // Match Angular config
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

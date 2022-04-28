import ReactDOM from 'react-dom'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    split,
    HttpLink,
} from '@apollo/client'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import App from './pages/App'

const httpLink = new HttpLink({
    uri: 'https://quainetworktest.hasura.app/v1/graphql',
})

const wsLink = new WebSocketLink({
    uri: 'wss://quainetworktest.hasura.app/v1/graphql',
    options: {
        reconnect: true,
        lazy: true,
        timeout: 30000,
        inactivityTimeout: 30000,
    },
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink,
)

const client = new ApolloClient({
    // uri: 'https://quainetworktest.hasura.app/v1/graphql',
    link: splitLink,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

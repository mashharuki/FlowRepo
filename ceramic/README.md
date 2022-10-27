# Ceramic Network

## Self.ID SDK

### install

`npm install @self.id/framework`

### set up

```js
import { Provider } from '@self.id/framework'

function App({ children }) {
  return <Provider client={{ ceramic: 'testnet-clay' }}>{children}</Provider>
}
```

## JavaScript HTTP client
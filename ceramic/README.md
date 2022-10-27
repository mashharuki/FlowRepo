# Ceramic Network

## IDX とは
IDXはDIDをベースに様々なデータを紐付け、アプリケーション横断でのデータの共有などを実現するためのプロトコル

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

```ts
 // get accounts
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // connect
        await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
```
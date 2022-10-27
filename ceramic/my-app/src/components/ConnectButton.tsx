import { useViewerConnection } from '@self.id/framework';
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking';

/**
 * ConnectButton
 * @returns 
 */
function ConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection()

  return connection.status === 'connected' ? (
    <button
      onClick={() => {
        disconnect()
      }}>
      Disconnect ({connection.selfID.id})
    </button>
  ) : 'ethereum' in window ? (
    <button
      disabled={connection.status === 'connecting'}
      onClick={async () => {
        // get accounts
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // connect
        await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
      }}>
      Connect
    </button>
  ) : (
    <p>
      An injected Ethereum provider such as{' '}
      <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
    </p>
  )
}

export default ConnectButton;
import { useViewerConnection } from '@self.id/framework';
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking';
import ShowViewerName from './ShowViewerName';
import SetViewerName from './SetViewerName';
import { createBlocto } from './Utils/CreateBlocto';

/**
 * ConnectButton
 * @returns 
 */
function ConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection();
  const blocto = createBlocto();

  return connection.status === 'connected' ? (
    <>
        <button
          onClick={() => {
            disconnect()
        }}>
            Disconnect ({connection.selfID.id})
        </button>
        <ShowViewerName/>
        <SetViewerName/>
    </>
  ) : 'ethereum' in blocto ? (
    <button
      disabled={connection.status === 'connecting'}
      onClick={async () => {
        // get accounts
        const accounts = await blocto.ethereum?.request({
          method: 'eth_requestAccounts',
        });
        console.log("blocto:", blocto);
        console.log("accounts:", accounts);
        // connect
        await connect(new EthereumAuthProvider(blocto.ethereum, '0x1c45052B39A0a0A01f71174554954c7418c44C95'))
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
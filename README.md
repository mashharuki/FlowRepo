# FlowRepo
this is a develop repo for learning flow Blockchain

### Install the Flow CLI

`brew install flow-cli`  

`flow -h`  

レスポンス例

```zsh
Usage:
flow [command]

Hot Commands:

deploy       Deploy all project contracts
init         Initialize a new configuration
run          Start emulator and deploy all project contracts

Available Commands:

accounts     Utilities to manage accounts
app          Utilities to create Flow app
blocks       Utilities to read blocks
cadence      Execute Cadence code
collections  Utilities to read collections
completion   Generate the autocompletion script for the specified shell
config       Utilities to manage configuration
dev-wallet   Starts a dev wallet
emulator     Starts the Flow emulator server
events       Utilities to read events
help         Help about any command
keys         Utilities to manage keys
project      Manage your Cadence project
scripts      Utilities to execute scripts
signatures   Signature verification and creation
snapshot     Utilities to download the latest finalized protocol state snapshot
status       Display the status of the Flow network
test         Run Cadence tests
transactions Utilities to send transactions
version      View version and commit information

Flags:
  -f, --config-path strings   Path to flow configuration file (default [/Users/harukikondo/flow.json,flow.json])
  -x, --filter string         Filter result values by property name
  -h, --help                  help for flow
      --host string           Flow Access API host address
  -l, --log string            Log level, options: "debug", "info", "error", "none" (default "info")
  -n, --network string        Network from configuration file (default "emulator")
      --network-key string    Flow Access API host network key for secure client connections
  -o, --output string         Output format, options: "text", "json", "inline" (default "text")
  -s, --save string           Save result to a filename
  -y, --yes                   Approve any prompts
Use "flow [command] --help" for more information about a command.
```

### Upgrade the Flow CLI

`brew upgrade flow-cli`

### Generate Key 

`flow keys generate`  

レスポンス例※下記の鍵は開発用！！  

```zsh
🔴️ Store private key safely and don't share with anyone! 
Private Key              aa82c278172073b9a84a71872b82021c5c10ce2f2f704dad0467d0422c8830b5 
Public Key               a2462e7a65c0ab9f2856a12d53316d467d873370133c1920574ab5ded9afd67e8f93866557e0d8df6ca27f5e197e7c2044e85b5d3ccdf32ab2180bdf77df2ec0 
Mnemonic                 weather middle make account peace fossil front measure antique girl account sorry 
Derivation Path          m/44'/539'/0'/0/0 
```

json形式で出力した場合は下記のコマンド  
`flow keys generate --output json`  

### Create Account

1. `flow init` 

```zsh
Configuration initialized
Service account: 0xf8d6e0586b0a20c7

Start emulator by running: 'flow emulator' 
Reset configuration using: 'flow init --reset'
```

2. `flow emulator`

```zsh
INFO[0000] ⚙️   Using service account 0xf8d6e0586b0a20c7  serviceAddress=f8d6e0586b0a20c7 serviceHashAlgo=SHA3_256 servicePrivKey=8a99d56dd364aace4f591dfb7f5c761395ac05e09d618fad959eeac765c37dd8 servicePubKey=cfd14c89f22695a20a7a566e3bfa7cf4ff5c1fbc11880bd22bb3d0e00b5f0552fda8f5e4a3546ae3482dfee9b54bbe73eb3e77cfcfeb032dfcba64b34be3a148 serviceSigAlgo=ECDSA_P256
INFO[0000] 📜  Flow contract                              FlowServiceAccount=0xf8d6e0586b0a20c7
INFO[0000] 📜  Flow contract                              FlowToken=0x0ae53cb6e3f42a79
INFO[0000] 📜  Flow contract                              FungibleToken=0xee82856bf20e2aa6
INFO[0000] 📜  Flow contract                              FlowFees=0xe5a8b7f23e8b548f
INFO[0000] 📜  Flow contract                              FlowStorageFees=0xf8d6e0586b0a20c7
INFO[0000] 🌱  Starting gRPC server on port 3569          port=3569
INFO[0000] 🌱  Starting REST API on port 8888             port=8888
INFO[0000] 🌱  Starting admin server on port 8080         port=8080
INFO[0000] ✅  Started admin server on port 8080          port=8080
INFO[0000] ✅  Started gRPC server on port 3569           port=3569
INFO[0000] ✅  Started REST API server on port 8888       port=8888
```

3. `flow accounts get <address>`

```zsh
Address  0xf8d6e0586b0a20c7
Balance  999999999.99700000
Keys     1

Key 0   Public Key               cfd14c89f22695a20a7a566e3bfa7cf4ff5c1fbc11880bd22bb3d0e00b5f0552fda8f5e4a3546ae3482dfee9b54bbe73eb3e77cfcfeb032dfcba64b34be3a148
        Weight                   1000
        Signature Algorithm      ECDSA_P256
        Hash Algorithm           SHA3_256
        Revoked                  false
        Sequence Number          0
        Index                    0

Contracts Deployed: 10
Contract: 'FlowIDTableStaking'
Contract: 'FlowEpoch'
Contract: 'FlowContractAudits'
Contract: 'FlowServiceAccount'
Contract: 'FlowStorageFees'
Contract: 'FlowClusterQC'
Contract: 'FlowDKG'
Contract: 'LockedTokens'
Contract: 'StakingProxy'
Contract: 'FlowStakingCollection'


Contracts (hidden, use --include contracts)
```

テストネットのアカウントのデータを取得する場合には下記のようなコマンドを打つこと  
`flow accounts get 0x11e681a52f08ed7a -n testnet`  

レスポンス例
```zsh
Address  0x11e681a52f08ed7a
Balance  1000.00100000
Keys     1

Key 0   Public Key               d9e97f428ab0ee18e90c3761accf18cf2620ffa3b993c3a014aec32abb181a4bfa25d6f9bd5bc79031db507f337f64b774a6202ac4de4be88acd8c82055fcc35
        Weight                   1000
        Signature Algorithm      ECDSA_P256
        Hash Algorithm           SHA3_256
        Revoked                  false
        Sequence Number          0
        Index                    0

Contracts Deployed: 0


Contracts (hidden, use --include contracts)
```

4. `flow accounts create`  

```zsh
Enter an account name: mashharuki
✔ Flow Testnet

❗ This command will perform the following:
 - Generate a new ECDSA P-256 public and private key pair.
 - Save the private key to mashharuki.private.json and add it to .gitignore.
 - Create a new account on Flow Testnet paired with the public key.
 - Save the newly-created account to flow.json.

Please complete the following steps in a web browser:
 1. Complete the captcha challenge.
 2. Click the 'Create Account' button.
 3. Return to this window.

You can also navigate to the link manually: https://testnet-faucet.onflow.org/?key=d9e97f428ab0ee18e90c3761accf18cf2620ffa3b993c3a014aec32abb181a4bfa25d6f9bd5bc79031db507f337f64b774a6202ac4de4be88acd8c82055fcc35

🎉 New account created with address 0x11e681a52f08ed7a and name mashharuki.

Here’s a summary of all the actions that were taken:
 - Added the new account to flow.json.
 - Saved the private key to mashharuki.private.json.
 - Added mashharuki.private.json to .gitignore.
```

### Deploy Contract with CLI 

`flow accounts add-contract HelloWorld ./smartcontract/HelloWorld.cdc --signer mashharuki --network testnet`  

レスポンス例
```zsh
Address  0x11e681a52f08ed7a
Balance  1000.00099756
Keys     1

Key 0   Public Key               d9e97f428ab0ee18e90c3761accf18cf2620ffa3b993c3a014aec32abb181a4bfa25d6f9bd5bc79031db507f337f64b774a6202ac4de4be88acd8c82055fcc35
        Weight                   1000
        Signature Algorithm      ECDSA_P256
        Hash Algorithm           SHA3_256
        Revoked                  false
        Sequence Number          1
        Index                    0

Contracts Deployed: 1
Contract: 'HelloWorld'


Contracts (hidden, use --include contracts)
```

### Upgrade Contract with CLI 
`flow accounts upgrade-contract FungibleToken`

### remove Contract with CLI 
`flow accounts remove-contract FungibleToken`

### Get Account Staking Info with CLI

`flow accounts staking-info mashharuki`

### Execute Script 

`flow scripts execute <filename> [<argument> <argument>...] [flags]`

### Send Transaction

`flow transactions send <code filename> [<argument> <argument>...] [flags]`  

`flow transactions send ./tx/Transaction1.cdc -n testnet --signer  mashharuki`

```zsh
Transaction ID: 53393a4e46ee0f556863b40b08f7246517b18dc4508b9216f764415592091ab4

Status          ✅ SEALED
ID              53393a4e46ee0f556863b40b08f7246517b18dc4508b9216f764415592091ab4
Payer           11e681a52f08ed7a
Authorizers     [11e681a52f08ed7a]

Proposal Key:
    Address     11e681a52f08ed7a
    Index       0
    Sequence    1

No Payload Signatures

Envelope Signature 0: 11e681a52f08ed7a
Signatures (minimized, use --include signatures)

Events:          
    Index       0
    Type        A.7e60df042a9c0868.FlowToken.TokensWithdrawn
    Tx ID       53393a4e46ee0f556863b40b08f7246517b18dc4508b9216f764415592091ab4
    Values
                - amount (UFix64): 0.00000199 
                - from (Address?): 0x11e681a52f08ed7a 

    Index       1
    Type        A.7e60df042a9c0868.FlowToken.TokensDeposited
    Tx ID       53393a4e46ee0f556863b40b08f7246517b18dc4508b9216f764415592091ab4
    Values
                - amount (UFix64): 0.00000199 
                - to (Address?): 0x912d5440f7e3769e 

    Index       2
    Type        A.912d5440f7e3769e.FlowFees.FeesDeducted
    Tx ID       53393a4e46ee0f556863b40b08f7246517b18dc4508b9216f764415592091ab4
    Values
                - amount (UFix64): 0.00000199 
                - inclusionEffort (UFix64): 1.00000000 
                - executionEffort (UFix64): 0.00000020 



Code (hidden, use --include code)

Payload (hidden, use --include payload)
```

### Get Transaction

`flow transactions get <tx_id>`

### build Transaction

`flow transactions build ./tx/Transaction1.cdc --authorizer mashharuki --save ./tx/build/built.rlp`

```zsh
ID      dc8ae0a167734cbf50635ad8519e4fd7640cdcb7a6894b2e36ba11914bbec8a5
Payer   f8d6e0586b0a20c7
Authorizers     [11e681a52f08ed7a]

Proposal Key:
    Address     f8d6e0586b0a20c7
    Index       0
    Sequence    0

No Payload Signatures

No Envelope Signatures


Arguments       No arguments

Code

import HelloWorld from 0x11e681a52f08ed7a;

/**
 * Transaction
 */
transaction {

    // prepare
        prepare(acct: AuthAccount) {}

💾 result saved to: ./tx/build/built.rlp 
```

### sign Transaction

`flow transactions sign ./tx/build/built.rlp --signer mashharuki --filter payload --save ./tx/signed/signedTx.rlp`

```zsh

```

### send signed Transaction

`flow transactions send-signed ./tx/signed/`

### generate signature

`flow signatures generate "test"`

```zsh
Signature                81011560982e5b9579de6c7d94907c8299a60899df2709030261d3f0df5fbe07aecd0ad91db78c52f95213b8eac6d0f9499a0722b483ddece151f4d51b1aa8b4
Message                  test
Public Key               0xcfd14c89f22695a20a7a566e3bfa7cf4ff5c1fbc11880bd22bb3d0e00b5f0552fda8f5e4a3546ae3482dfee9b54bbe73eb3e77cfcfeb032dfcba64b34be3a148
Hash Algorithm           SHA3_256
Signature Algorithm      ECDSA_P256
```

### Verify a Signature 

`flow signatures verify "test" 81011560982e5b9579de6c7d94907c8299a60899df2709030261d3f0df5fbe07aecd0ad91db78c52f95213b8eac6d0f9499a0722b483ddece151f4d51b1aa8b4 0xcfd14c89f22695a20a7a566e3bfa7cf4ff5c1fbc11880bd22bb3d0e00b5f0552fda8f5e4a3546ae3482dfee9b54bbe73eb3e77cfcfeb032dfcba64b34be3a148`

```zsh
Valid                    true
Message                  test
Signature                81011560982e5b9579de6c7d94907c8299a60899df2709030261d3f0df5fbe07aecd0ad91db78c52f95213b8eac6d0f9499a0722b483ddece151f4d51b1aa8b4
Public Key               cfd14c89f22695a20a7a566e3bfa7cf4ff5c1fbc11880bd22bb3d0e00b5f0552fda8f5e4a3546ae3482dfee9b54bbe73eb3e77cfcfeb032dfcba64b34be3a148
Hash Algorithm           SHA3_256
Signature Algorithm      ECDSA_P256
```

### Blocto Wallet Tutorial

1. `cd my-app`
2. `npm i @onflow/fcl styled-components`

### 参考文献
1. [Developer Portal](https://developers.flow.com/)
2. [Blocto Wallet｜ウォレットの使い方とFlowのステーキング方法](https://dappsmarket.net/guide/blocto-howtouse/)
3. [Blocto Wallet](https://portto.com/)
4. [testnet faucet](https://testnet-faucet-v2.onflow.org/)
5. [Blocto Wallet 開発者向けドキュメント](https://docs.blocto.app/)
6. [敷居を下げる、充実したエコシステム：クロスブロックチェーンのスマートコントラクトウォレット「Blocto」を知る](https://coinpost.jp/?post_type=breaking&p=300918)
7. [Flow Playground](https://play.onflow.org/local-project)
8. [Emerald emerald academy logo Academy](https://academy.ecdao.org/)
9. [Testnet](https://testnet.flowscan.org/)
10. [Mainnet](https://flowscan.org/)
11. [EmeraldID](https://id.ecdao.org/me)
12. [beginner-cadence-course](https://github.com/mashharuki/beginner-cadence-course)
13. [beginner-dapp-course](https://github.com/emerald-dao/beginner-dapp-course)
14. [Install the Flow CLI](https://developers.flow.com/tools/flow-cli/install)
15. [DApps のユーザー認証に web3.eth.personal.sign を使おう！](https://tech.drecom.co.jp/dapps-use-web3-eth-personal-sign/)
16. [FCL Development Wallet](https://github.com/onflow/fcl-dev-wallet)
17. [Blocto Wallet zendesk](https://portto.zendesk.com/hc/en-us)
18. [How Blocto as a cross-chain smart contract wallet solve user & developer problems](https://portto.com/blocto-crypto-blog/ecosystem/cross-chain-smart-contract-wallet-solve-user-amp-developer-problems)
19. [Blocto Wallet Docs](https://docs.blocto.app/blocto-app/web3-provider/batch-transaction)
20. [Blocto for Developers](https://developers-testnet.blocto.app/)
21. [Blocto SDK JavaScript](https://docs.blocto.app/blocto-sdk/javascript-sdk/evm-sdk)
22. [Crypto Candy](https://github.com/amitkothari/crypto-candy)
23. [Blocto SDK in Flow dApps](https://docs.blocto.app/blocto-sdk/javascript-sdk/flow)
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

2. `flow accounts get <address>`

3. `flow accounts create`  


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
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./CoreWallet.sol";
import "./../Token/MyToken.sol";

/**
 * WalletFactoryV3 Contract
 */
contract WalletFactoryV3 {
    // userID
    string public userId;
    // MyToken
    MyToken IDQToken;

    mapping(string => bool) public isRegistered;
    mapping(string => address) public walletMap;

    // event
    event Create(string _userId, address wAddress);

    /**
     * create Core Wallet
     * @param _userId userID
     */
    function createCoreWallet(string memory _userId) public {
        // check
        require(!isRegistered[_userId], "this userID is already registered.");
        // create wallet
        CoreWallet wallet = new CoreWallet(_userId);
        // get wallet address
        address wAddress = address(wallet);

        // set mapping
        isRegistered[_userId] = true;
        walletMap[_userId] = wAddress;

        emit Create(_userId, wAddress);
    }
}

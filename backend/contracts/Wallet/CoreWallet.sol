// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

/**
 * CoreWallet Contract
 */
contract CoreWallet {

    // user ID
    string public userId;

    /**
     * contructor
     */
    constructor (string memory _userId) {
        // set userID
        userId = _userId;
    }
}
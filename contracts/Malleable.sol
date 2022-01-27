//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Malleable {

  function test(string calldata message, uint8 v, bytes32 r, bytes32 s, address expectedSigner) external pure {
    bytes32 hash = ECDSA.toEthSignedMessageHash(bytes(message));
    (address signer) = ecrecover(hash, v, r, s); 
    require(signer==expectedSigner, "Malleable: signer!=expectedSigner.");
  }
  
}

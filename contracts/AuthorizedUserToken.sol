// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ISbtToken.sol";

/* This contract is used to issue the authorization token to Organizations and Individuals
   Organizations can issue SBTs if they have the valid authorization token.
   Verified users can use the authorization token to access the platform and their SBTs.
*/

contract AuthorizedUserToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct AuthToken {
        uint256 tokenId;
        string userName;
        string category;
        address[] allowedSBTs;
    }

    mapping(address => AuthToken) private authTokens;

    event CredentialIssued(uint256 tokenId, address to);

    constructor() ERC721("Authorization Token", "AUTH") {}

    // add new allowedSBT - authToken specific extra functionality
    function addNewAllowedSBT(address newSBT) public onlyOwner {
        authTokens[msg.sender].allowedSBTs.push(newSBT);
    }

    // mint default AUTH SBT - for judges to test protocol - TO USE
    // This function is only for testing purposes
    function mintDefaultAuthSbtForTesting(
        address to,
        string memory userName,
        string memory category,
        address[] memory allowedSBTs
    ) external {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        authTokens[msg.sender] = AuthToken(
            tokenId,
            userName,
            category,
            allowedSBTs
        );
        // call ISbtToken(allowedSbt).addIssuer for each allowedSBT
        for (uint256 i = 0; i < allowedSBTs.length; i++) {
            ISbtToken(allowedSBTs[i]).addIssuer(to);
        }
        emit CredentialIssued(tokenId, to);
    }

    // issue the credential
    // modifier -
    function issueCredential(
        address to,
        string memory organizationName,
        string memory category,
        address[] memory allowedSBTs
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        authTokens[msg.sender] = AuthToken(
            tokenId,
            organizationName,
            category,
            allowedSBTs
        );

        // call ISbtToken(allowedSbt).addIssuer for each allowedSBT
        for (uint256 i = 0; i < allowedSBTs.length; i++) {
            ISbtToken(allowedSBTs[i]).addIssuer(to);
        }

        emit CredentialIssued(tokenId, to);
    }

    // get metadata of the verified user
    function getVerifiedUserMetadata(
        address walletAddress
    ) public view returns (AuthToken memory) {
        return authTokens[walletAddress];
    }

    // make this nft non-transferable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(
            from == address(0) || to == address(0),
            "This NFT is non-transferable"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}

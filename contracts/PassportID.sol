// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PassportID is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    struct Credential {
        string passportNumber; // Unique passport number, often alphanumeric
        string holderName;
        string nationality;
        string dateOfBirth;
        string gender; // Typically Male, Female, or Other
        string placeOfIssue;
        string expiryDate;
    }

    struct VerificationRequest {
        address requestedBy;
        address credentialHolder;
        uint256 tokenId;
        string status; // E.g., "Pending", "Approved", "Rejected"
        address sbtAddress;
        string sbtName;
        string sbtSymbol;
    }

    mapping(uint256 => Credential) private credentials;
    // tokenId => (verifier_wallet => bool)
    mapping(uint256 => mapping(address => bool)) private verifiers;
    mapping(address => bool) private sbtIssuers;

    // tokenId => verificationRequest
    mapping(uint256 => VerificationRequest[]) private verificationRequests;

    // wallet => tokenIds
    mapping(address => uint256[]) private walletToTokenIds;

    event CredentialIssued(uint256 tokenId, address to);
    event ApprovedVerificationRequest(
        address credentialHolder,
        uint256 tokenId,
        address verifier
    );

    constructor() ERC721("Educational ID", "EDU") {}

    modifier allowedVerifier(uint256 tokenId, address verifier) {
        require(
            verifiers[tokenId][verifier] || ownerOf(tokenId) == verifier,
            "Not allowed to verify"
        );
        _;
    }

    modifier onlyIssuers() {
        require(
            sbtIssuers[msg.sender],
            "Only allowed organizations can issue credentials"
        );
        _;
    }

    // Modifier to check if the caller is the owner of the token
    modifier onlyIdOwner(uint256 tokenId) {
        require(
            ownerOf(tokenId) == msg.sender,
            "Not the owner of the Credential"
        );
        _;
    }

    modifier onlyAdmin() {
        require(owner() == tx.origin, "You are not the Admin");
        _;
    }

    // request for verification
    function requestForVerification(
        address credentialHolder,
        uint256 tokenId,
        address sbtAddress,
        string memory sbtName,
        string memory sbtSymbol
    ) public {
        require(
            ownerOf(tokenId) == credentialHolder,
            "Token Id does not belong to this address"
        );
        verificationRequests[tokenId].push(
            VerificationRequest(
                msg.sender,
                credentialHolder,
                tokenId,
                "Pending",
                sbtAddress,
                sbtName,
                sbtSymbol
            )
        );
    }

    // Add verifier - Digial ID owner only should be able to add verifiers
    // modifier - onlyIdOwner
    function addVerifier(
        uint256 tokenId,
        address verifier
    ) public onlyIdOwner(tokenId) {
        verifiers[tokenId][verifier] = true;
    }

    // SBT can have many issuers
    function addIssuer(address issuer) public {
        sbtIssuers[issuer] = true;
    }

    function removeIssuer(address issuer) public {
        sbtIssuers[issuer] = false;
    }

    // Only allowed organizations can issue credentials
    function issueCredential(
        address to,
        string memory passportNumber, // Unique passport number, often alphanumeric
        string memory holderName,
        string memory nationality,
        string memory dateOfBirth,
        string memory gender, // Typically Male, Female, or Other
        string memory placeOfIssue,
        string memory expiryDate
    ) public onlyIssuers {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        credentials[tokenId] = Credential(
            passportNumber,
            holderName,
            nationality,
            dateOfBirth,
            gender,
            placeOfIssue,
            expiryDate
        );
        walletToTokenIds[to].push(tokenId);

        emit CredentialIssued(tokenId, to);
    }

    // allowed verifiers can view i.e. verify the credential
    function verifyCredential(
        uint256 tokenId
    )
        public
        view
        allowedVerifier(tokenId, msg.sender)
        returns (Credential memory)
    {
        return credentials[tokenId];
    }

    // get all verification requests for a token - to be viewed by the owner of the token
    function getVerificationRequestsForUser()
        public
        view
        returns (VerificationRequest[] memory)
    {
        uint256[] memory tokenIds = walletToTokenIds[msg.sender];
        uint256 count = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            VerificationRequest[] memory requests = verificationRequests[
                tokenIds[i]
            ];
            for (uint256 j = 0; j < requests.length; j++) {
                count++;
            }
        }
        VerificationRequest[]
            memory filteredRequests = new VerificationRequest[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            VerificationRequest[] memory requests = verificationRequests[
                tokenIds[i]
            ];
            for (uint256 j = 0; j < requests.length; j++) {
                filteredRequests[index] = requests[j];
                index++;
            }
        }
        return filteredRequests;
    }

    // get all verification requests and their stat for an organization
    function getVerificationRequestsByOrganization()
        public
        view
        returns (VerificationRequest[] memory)
    {
        address organization = msg.sender;
        uint256 count = 0;
        uint256 tokenId = _tokenIdCounter.current();

        for (uint256 i = 0; i < tokenId; i++) {
            VerificationRequest[] memory requests = verificationRequests[i];
            for (uint256 j = 0; j < requests.length; j++) {
                if (requests[j].requestedBy == organization) {
                    count++;
                }
            }
        }
        VerificationRequest[]
            memory filteredRequests = new VerificationRequest[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < tokenId; i++) {
            VerificationRequest[] memory requests = verificationRequests[i];
            for (uint256 j = 0; j < requests.length; j++) {
                if (requests[j].requestedBy == organization) {
                    filteredRequests[index] = requests[j];
                    index++;
                }
            }
        }
        return filteredRequests;
    }

    // approve or reject the verification request
    // modifier - onlyIdOwner
    function approveVerificationRequest(
        uint256 tokenId,
        address verifier
    ) public onlyIdOwner(tokenId) {
        uint256 index = 0;
        for (uint256 i = 0; i < verificationRequests[tokenId].length; i++) {
            if (verificationRequests[tokenId][i].requestedBy == verifier) {
                index = i;
                break;
            }
        }
        verificationRequests[tokenId][index].status = "Approved";
        addVerifier(tokenId, verifier);
        emit ApprovedVerificationRequest(msg.sender, tokenId, verifier);
    }

    function rejectVerificationRequest(
        uint256 tokenId,
        address verifier
    ) public onlyIdOwner(tokenId) {
        uint256 index = 0;
        for (uint256 i = 0; i < verificationRequests[tokenId].length; i++) {
            if (verificationRequests[tokenId][i].requestedBy == verifier) {
                index = i;
                break;
            }
        }
        verificationRequests[tokenId][index].status = "Rejected";
        verifiers[tokenId][verifier] = false;
    }

    // get all tokenIds owned by a wallet
    function getTokenIdsByWallet() public view returns (uint256[] memory) {
        return walletToTokenIds[msg.sender];
    }

    // make this nft non-transferable i.e. SBT functionality
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

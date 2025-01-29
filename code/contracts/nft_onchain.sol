// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract BasicNFT is ERC721 {
    using Strings for uint256;

    // Store SVG data for each token
    mapping(uint256 => string) private tokenSVGs;

    // Store additional metadata
    mapping(uint256 => string) private tokenNames;
    mapping(uint256 => string) private tokenDescriptions;

    uint256 private _tokenIds;

    constructor() ERC721("Veigar42Stacks", "V42AP") {}

    // Add this function to check if a token exists
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return bytes(tokenSVGs[tokenId]).length > 0;
    }

    function mintNFT(
        string memory svg,
        string memory name,
        string memory description
    ) public returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        // Store the SVG and metadata
        tokenSVGs[newTokenId] = svg;
        tokenNames[newTokenId] = name;
        tokenDescriptions[newTokenId] = description;

        _safeMint(msg.sender, newTokenId);
        return newTokenId;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");

        // Create the SVG image with base64 encoding
        string memory svgBase64 = Base64.encode(bytes(tokenSVGs[tokenId]));
        string memory imageURI = string(
            abi.encodePacked("data:image/svg+xml;base64,", svgBase64)
        );

        // Create the JSON metadata
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        "{",
                        '"name": "',
                        tokenNames[tokenId],
                        '",',
                        '"description": "',
                        tokenDescriptions[tokenId],
                        '",',
                        '"image": "',
                        imageURI,
                        '",',
                        '"attributes": []',
                        "}"
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    // View functions to get stored data
    function getSVG(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenSVGs[tokenId];
    }

    function getMetadata(
        uint256 tokenId
    ) public view returns (string memory name, string memory description) {
        require(_exists(tokenId), "Token does not exist");
        return (tokenNames[tokenId], tokenDescriptions[tokenId]);
    }
}

/*
	TO MINT NFT:
		string memory svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>';
		string memory name = "Circle NFT";
		string memory description = "A simple red circle";
*/

// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VeigarOnChain is ERC721 {
    struct NFTData {
        string svg;
        string name;
        string description;
        string[] traitTypes;
        string[] traitValues;
    }

    mapping(uint256 => NFTData) private _tokenData;

    uint256 private _tokenIdCounter;

    constructor() ERC721("Veigar42Stacks", "V42AP") {}

    function mint(
        string memory svg,
        string memory name,
        string memory description,
        string[] memory traitTypes,
        string[] memory traitValues
    ) public {
        require(
            traitTypes.length == traitValues.length,
            "Mismatched attributes"
        );

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        string memory fullName = string(
            abi.encodePacked(name, "#", Strings.toString(_tokenIdCounter))
        );

        _tokenData[tokenId] = NFTData({
            svg: svg,
            name: fullName,
            description: description,
            traitTypes: traitTypes,
            traitValues: traitValues
        });

        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");

        NFTData memory data = _tokenData[tokenId];

        string memory image = string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(bytes(data.svg))
            )
        );

        string memory attributes = "[";
        for (uint256 i = 0; i < data.traitTypes.length; i++) {
            attributes = string(
                abi.encodePacked(
                    attributes,
                    '{"trait_type":"',
                    data.traitTypes[i],
                    '","value":"',
                    data.traitValues[i],
                    '"}',
                    i < data.traitTypes.length - 1 ? "," : ""
                )
            );
        }
        attributes = string(abi.encodePacked(attributes, "]"));

        string memory json = string(
            abi.encodePacked(
                '{"name":"',
                data.name,
                '",',
                '"description":"',
                data.description,
                '",',
                '"image":"',
                image,
                '",',
                '"attributes":',
                attributes,
                "}"
            )
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(bytes(json))
                )
            );
    }
}

// Contract address : 0xE056f17394D7526a2fB2A97164c0D666fa124f79

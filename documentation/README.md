# VeigarOnChain NFT Contract Documentation

## Overview

The VeigarOnChain contract implements an ERC-721 NFT collection called "Veigar42Stacks" (Symbol: V42AP) with on-chain SVG storage, metadata management, and attribute support. Each NFT contains a unique SVG image, name, description, and customizable traits stored directly on the blockchain.

## Contract Address

0xE056f17394D7526a2fB2A97164c0D666fa124f79

## Contract Dependencies

```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
```

## Storage Structure

### NFTData Struct

```solidity
struct NFTData {
    string svg;
    string name;
    string description;
    string[] traitTypes;
    string[] traitValues;
}
```

### State Variables

```solidity
mapping(uint256 => NFTData) private _tokenData;   // Stores NFT data
uint256 private _tokenIdCounter;                   // Token counter
```

## Core Functions

### Constructor

```solidity
constructor() ERC721("Veigar42Stacks", "V42AP") {}
```

Initializes the NFT collection with name "Veigar42Stacks" and symbol "V42AP".

### Minting Function

```solidity
function mint(
    string memory svg,
    string memory name,
    string memory description,
    string[] memory traitTypes,
    string[] memory traitValues
) public
```

#### Parameters

-   `svg`: SVG markup for the NFT image
-   `name`: Base name of the NFT (will be appended with #tokenId)
-   `description`: Description of the NFT
-   `traitTypes`: Array of trait type names
-   `traitValues`: Array of trait values corresponding to the trait types

#### Behavior

1. Validates that trait arrays match in length
2. Generates unique token ID
3. Creates full name with token number
4. Stores NFT data
5. Mints NFT to sender's address

### Token URI Generation

```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory)
```

#### Parameters

-   `tokenId`: ID of the token to query

#### Returns

-   Base64 encoded JSON metadata including:
    -   Name (with token number)
    -   Description
    -   Base64 encoded SVG image
    -   Array of attributes with trait types and values

## Metadata Format

The contract generates metadata in the following JSON format:

```json
{
	"name": "Token Name #1",
	"description": "Token Description",
	"image": "data:image/svg+xml;base64,<base64-encoded-svg>",
	"attributes": [
		{
			"trait_type": "Background",
			"value": "Blue"
		},
		{
			"trait_type": "Level",
			"value": "Rare"
		}
	]
}
```

## Usage Guide

### Minting an NFT

```solidity
// Example SVG data
string memory svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">'
    '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>'
    '</svg>';

// Example metadata
string memory name = "Circle NFT";
string memory description = "A simple red circle";

// Example traits
string[] memory traitTypes = new string[](2);
traitTypes[0] = "Background";
traitTypes[1] = "Level";

string[] memory traitValues = new string[](2);
traitValues[0] = "Blue";
traitValues[1] = "Rare";

// Mint the NFT
contract.mint(svg, name, description, traitTypes, traitValues);
```

## Key Features

1. On-chain SVG Storage

    - SVG images stored directly in contract storage
    - Base64 encoded for metadata URI

2. Dynamic Naming

    - Names automatically appended with token number
    - Format: "Name#TokenId"

3. Flexible Attributes
    - Support for arbitrary number of traits
    - Trait types and values stored as arrays
    - Attributes included in metadata JSON

## Security Considerations

1. Input Validation

    - Validates trait arrays match in length
    - No size limits on SVG input
    - Consider implementing maximum size checks

2. Access Control

    - Minting function is public
    - Consider adding access control for minting
    - Consider implementing pause mechanism

3. Storage
    - Data is immutable once stored
    - Consider implementing upgrade pattern if needed

## Future Improvements

1. Add access control for minting
2. Implement batch minting
3. Add SVG validation
4. Implement size limits
5. Add update mechanisms
6. Add events for important operations
7. Add royalty support

## License

Unlicense

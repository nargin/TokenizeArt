# Veigar42Stacks NFT Collection

## Project Overview

Veigar42Stacks is an on-chain SVG NFT collection built on the Ethereum blockchain. The project implements the ERC-721 standard to create unique, fully on-chain NFTs with embedded SVG artwork and metadata.

## Technical Choices & Rationale

### 1. On-Chain Storage Decision

We chose to store all NFT data (SVG artwork and metadata) directly on-chain for several reasons:

-   **True Decentralization**: No reliance on external storage solutions like IPFS or centralized servers
-   **Permanence**: Data persists as long as the Ethereum network exists
-   **Transparency**: All NFT data is publicly verifiable through the blockchain
-   **Immutability**: Once minted, the artwork cannot be altered or lost

### 2. ERC-721 Implementation

We implemented the ERC-721 standard because:

-   **Universal Compatibility**: Works with all major NFT marketplaces and wallets
-   **Proven Security**: Uses well-audited OpenZeppelin contracts
-   **Unique Identifiers**: Each token has a unique ID, perfect for our collection
-   **Standard Functions**: Implements required functions like `tokenURI()` for metadata

### 3. SVG Format Selection

SVG was chosen as the artwork format because:

-   **Scalable**: Maintains quality at any resolution
-   **Lightweight**: Efficient for on-chain storage
-   **Text-Based**: Easy to store and manipulate as strings
-   **Dynamic Potential**: Can be generated or modified programmatically

### 4. Base64 Encoding

We use Base64 encoding for both SVG and metadata because:

-   **Direct Rendering**: Browsers can display Base64 encoded images directly
-   **Standard Compliance**: Follows NFT metadata standards
-   **Data URI Scheme**: Enables immediate image display in marketplaces

## Architecture

### Smart Contract Structure

```
BasicNFT
├── ERC721 (OpenZeppelin)
├── Storage
│   ├── tokenSVGs mapping
│   ├── tokenNames mapping
│   └── tokenDescriptions mapping
└── Core Functions
    ├── mintNFT()
    ├── tokenURI()
    ├── getSVG()
    └── getMetadata()
```

### Key Components

1. **Token Storage**: Mappings for SVG data and metadata
2. **Minting Logic**: Public function to create new tokens
3. **Metadata Generation**: Dynamic JSON generation with Base64 encoding
4. **Retrieval Functions**: Public views for stored data

## Security Considerations

### Implemented Measures

-   Use of OpenZeppelin's secure contract implementations
-   Internal visibility for sensitive mappings
-   Existence checks for token queries
-   Safe minting implementation

### Gas Optimization

-   Efficient string handling
-   Optimized storage structure
-   Base64 encoding for data URIs

## Development Decisions

### 1. Simple Storage Model

We opted for a straightforward storage model using mappings because:

-   Clear data organization
-   Direct access to token data
-   Gas efficient for individual token operations

### 2. Public Minting

The minting function is public to:

-   Allow open participation
-   Enable marketplace integration
-   Simplify the minting process

### 3. Immutable Data

Once minted, token data cannot be modified:

-   Ensures artwork permanence
-   Builds trust in the collection
-   Maintains historical integrity

## Technical Specifications

### Contract Details

-   **Name**: Veigar42Stacks
-   **Symbol**: V42AP
-   **Standard**: ERC-721
-   **Network**: Ethereum Mainnet
-   **Solidity Version**: ^0.8.0

### Dependencies

```json
{
	"@openzeppelin/contracts": "^4.x.x",
	"hardhat": "^2.x.x",
	"@nomiclabs/hardhat-waffle": "^2.x.x"
}
```

## Future Improvements

### Planned Enhancements

1. **Access Control**

    - Role-based minting permissions
    - Admin functions for collection management

2. **Metadata Enhancement**

    - Dynamic attributes
    - On-chain trait rarity

3. **Gas Optimization**

    - Batch minting functionality
    - Storage optimization for large collections

4. **Additional Features**
    - SVG validation
    - Size limitations
    - Event logging

## Getting Started

### Prerequisites

-   Node.js
-   NPM or Yarn
-   Hardhat
-   Ethereum wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/nargin/tokenizeArt

# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test
```

### Example Usage

```javascript
// Mint a new NFT
const svg = "<svg>...</svg>";
const name = "Veigar #1";
const description = "Powerful mage with 42 AP stacks";
await contract.mintNFT(svg, name, description);
```

## Testing

### Test Coverage

-   Minting functionality
-   Metadata generation
-   Token URI formatting
-   Access control
-   Edge cases

### Run Tests

```bash
npx hardhat test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

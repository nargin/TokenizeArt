const { expect } = require('chai');
const { ethers } = require("hardhat");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="27" xml:space="preserve" version="1.1" viewBox="0 0 27 27">
  <image width="27" height="27" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAIAAAACtmMCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAdKSURBVEhLVVZ7bFPXGb9P3+u387RjbIckxMujSUgpYTTQDQgMhY3SQpuQiNFq2qb1NYnSDE2NEA0aLKCKwf4ZGiMUBXXVaFOQRkRbtgaF0CY8k5CXHeIkTmzHdvy419e+j3N3rh1N9GfLPt95/M7vfOd+33fR3Tv3Ic8AQzEUQZWWnLafAUAkSZZWjB8AroBLUDm9RGHMe++P6YE0QPr7f4jJlQYEXJAm5MS0KXLKb3q+jMgpMQWt1NWLhNKLIF+07jDqjRiGK5utaMzsmG6vQIZQ/n/Ql94IgFgsuqXzEpyQZhQRiyU/aTAgemOS1KfCLG0wyJiE4nAUJVSkOOtSWDAkmaJJtYCigE9IqEoiDaZUUkBlPhvDtWEKYSG1RABJOYk3xtAmM21yoKmErmgNiqLr95dpCytkID06d4YJsvathbws5qx/RVdomL3+5WRvhM7JQyGRXRObdodTCSnBlckKIybwKQRISUEk9dnUmudpa4npR6Vr237t/ebGv3dtfnyyY6Hvv5LA5a8xs4HI3UPtI385TejQ9R9+oG/Ybdx7gJl05dVU0yZTSoRHFwAAmAQ1AoFEcQGQxkLHq+/u23jgpcDf3vdNjCKIqf5tm1qnJoncuc1RsaMEnob1xN2X+4c/+kOy79PiDWXAlJ1YDuJGNYrDR4GXRB7DCRzOQ0lVbpFNS/L+mQufN2xWO3jH/nW2F51kcSGSQp1NOwPqilyzs7b9eWaKR7Gsmt/VLg3cfvzO66Vv7NPoTdx8BBGVSxOTDEaSJJKEV0oQNCFH7nJ+P4ERU92jCV70PVlMLIuoIM6W18UD8YklZnksReYTuhJNxeYaKCg86WZu91BGrW6VRcYIlhEQwGMUrVY0YoRKj+N8n0Yv5lTmqI3qwJURURS5BIYIonjy8oMh73O1RjYoC3zc+VohxmOYCjNVmZDwtO2FKvuGKoLWQB6a1mIkRXFJ+OG2v1iEBNWGUi25dbumeTdIwueCmL3jN7++LTH5SPj4H4O+fDHJk3ZKYwMj/r6CLVaVUSUJqfkbn+XbrQSt5lkW6sMgsQKAuPq+f9jz8M65Jyb/Q/WTfpHjEBUVd4WSr72s31Qiorg0eEktCg2Hd9GqghQLyCKr7ytfYDgYmhxSiykS10MalYrCYFDwPI8hsnvcTVEUv8y7vnbdu3SfUpMwxL0jLjwRMVSZsjbkzf19Dnq2stx+a2Zu+gk3d/6+vrLA0VgABNkzNAgDCiREkqAUjfAhUmNSYMIjpaTo04jlZ0WWtat4kPxF+2YEFyJ/OqdSJaMPgkyEaeza+0mvCw8YAh8/xjUGQ2Xh9L/m/KORwLgbA0CWAAahRCrMKkDkeYnU0PEwEx2IOH9SuO10w+R3U4ggJAE+eOI739h3x+mf+rwg3v0w2P4FJqQA4Lxf3sdJHF4HlWUASBJyoiikhCJ5REQRo9MuJQQ6iy5Yq4v4osFF3ryzWGtWFZTpTE6zbX3hV4fvDL7zz+iYFyNpUxGB2bIlVEplG0zZOFZSxrEcLypJCUPT2QQmguKtdQiQhbgQnomJSWGobWBxYK606bmRq8OxhdjCiD84t+j3+ELziyHvIvrzLeyEJ7Ecjd4b8U8tPPjzCXZxmltehJlIkSgILKZSGcprEJhrKNL32J9XnU3Q+NPzT+d7Z00GNY2pcRVudzg4joP5at26dYuXB5NLy7//1W8mxscZhvn21q1yZ8nMt58oGtMKEZDiA2Me8459JI3INHX/sou0kGsacpb+M2vSGwlUiMwG2j9sj0ajmfl4xNPU1HTq1KmjR48eOHiwrq7uSnc3z4TgfgqjEj04PnLlZsOxQ+G5GB9LoECKTIcXRgIoIcZZbnkpUl5e1trS0tnZmWGM+9nKykq43uPxfH71an9/f0lJiSxL0Vh0RSOK4yarff7W0Aff93CROBuK4rgcdgUSy3E2yiSi7LFjH128eNHtdmfmQ3R1dV27dm1yakqn1VZXV/f09MgA3L03oDBKPI9IYmxhbmkmxsSz3xof1eWuYpZiqxuLgY6MhRjouMbGxuPHj2e4Mghy3HsnT4RCobNnz7Is+/7hwzilYxIM0rr34KZD56l8a25F7epdTc6X397Y1tn62TfNXd25RdYsaw6lVff29sIDPov6+vqs6k2Qt62tDTq3uqYGnhJmG0ueBW3d+8sZR/3wpx24Vk/pjCSZI2dpYUHSAokuMjpbWr5+6908CShJD0EaGhrOnDnT3Nx8/fr1RIJ78803Lly40NHRcfPmTZvNBn2iJrVQ44ENv/2rOd+cY3NApRrraq2lQGuxaswFGrNdk29XGa2qLJvWWooR5JEjR6DAlpYWyL5nzx6Y7jKSM6ipqdn20na05dVWd95GxTGCAAulpNR5xYLeVfoybRgMQPYN3wi6+9N2GjDHZIrtM6iqWIvuf2U/SA8AWMtl5X1CMWDPSuWGbwoAGplanSGZcI+Njj96ofbHjlVFPr93YOi2MpYBgvwP0lm6MEQsKQcAAAAASUVORK5CYII="/>
</svg>`;

describe('VeigarOnChain', function () {
  before(async function () {
    this.VeigarOnChain = await ethers.getContractFactory('VeigarOnChain');
  });

  beforeEach(async function () {
    // Deploy the contract
    this.veigarNFT = await this.VeigarOnChain.deploy();
    await this.veigarNFT.waitForDeployment();

    // Get the contractOwner and collector address
    const signers = await ethers.getSigners();
    this.contractOwner = signers[0].address;
    this.collector = signers[1].address;

    // Get the collector contract for signing transaction with collector key
    this.collectorContract = this.veigarNFT.connect(signers[1]);

    // Sample data for testing
    this.sampleSVG = svg;
    this.sampleTraitTypes = ["Rarity", "Power Level"];
    this.sampleTraitValues = ["Legendary", "9000"];
    
    // Mint an initial set of NFTs
    this.initialMintCount = 3;
    this.initialMint = [];
    for (let i = 0; i < this.initialMintCount; i++) {
        const tx = await this.veigarNFT.mint(
            this.sampleSVG,
            `Token ${i}`,
            `Description for token ${i}`,
            this.sampleTraitTypes,
            this.sampleTraitValues
        );
        await tx.wait();
        this.initialMint.push(i.toString());
    }
  });

  it('Creates a token collection with a name', async function () {
    expect(await this.veigarNFT.name()).to.equal("Veigar42Stacks");
  });

  it('Creates a token collection with a symbol', async function () {
    expect(await this.veigarNFT.symbol()).to.equal("V42AP");
  });

  it('Mints initial set of NFTs from collection to contractOwner', async function () {
    for (let i = 0; i < this.initialMint.length; i++) {
        expect(await this.veigarNFT.ownerOf(this.initialMint[i])).to.equal(this.contractOwner);
    }
  });

  it('Is able to query the NFT balances of an address', async function () {
    expect(await this.veigarNFT.balanceOf(this.contractOwner)).to.equal(this.initialMint.length);
  });

  it('Is able to mint new NFTs with traits to the collection', async function () {
    const tx = await this.veigarNFT.mint(
        this.sampleSVG,
        "New Token",
        "New Description",
        ["Rarity", "Level"],
        ["Epic", "42"]
    );
    await tx.wait();
    const tokenId = "3"; // Next token ID after initial 3
    expect(await this.veigarNFT.ownerOf(tokenId)).to.equal(this.contractOwner);
  });

  it('Reverts when minting with mismatched trait arrays', async function () {
    await expect(
      this.veigarNFT.mint(
        this.sampleSVG,
        "New Token",
        "New Description",
        ["Common"], // Only one trait type
        ["Epic", "42"] // Two trait values
      )
    ).to.be.revertedWith("Mismatched attributes");
  });

  it('Returns valid tokenURI with base64 encoded JSON including attributes', async function () {
    const tokenId = "0"; // Use first token
    const tokenURI = await this.veigarNFT.tokenURI(tokenId);
    expect(tokenURI).to.include('data:application/json;base64,');
    
    // Decode and verify the JSON structure
    const base64Json = tokenURI.split('base64,')[1];
    const decodedJson = JSON.parse(Buffer.from(base64Json, 'base64').toString());
    expect(decodedJson).to.have.property('name');
    expect(decodedJson).to.have.property('description');
    expect(decodedJson).to.have.property('image');
    expect(decodedJson).to.have.property('attributes');
    expect(decodedJson.attributes).to.be.an('array');
    expect(decodedJson.attributes[0]).to.have.property('trait_type');
    expect(decodedJson.attributes[0]).to.have.property('value');
    expect(decodedJson.image).to.include('data:image/svg+xml;base64,');
  });

  it('Is able to transfer NFTs to another wallet when called by owner', async function () {
    const tokenId = "0"; // Use first token
    await this.veigarNFT["safeTransferFrom(address,address,uint256)"](this.contractOwner, this.collector, tokenId);
    expect(await this.veigarNFT.ownerOf(tokenId)).to.equal(this.collector);
  });

  it('Emits a Transfer event when transferring a NFT', async function () {
    const tokenId = "0"; // Use first token
    await expect(this.veigarNFT["safeTransferFrom(address,address,uint256)"](this.contractOwner, this.collector, tokenId))
      .to.emit(this.veigarNFT, "Transfer")
      .withArgs(this.contractOwner, this.collector, tokenId);
  });

  it('Approves an operator wallet to spend owner NFT', async function () {
    const tokenId = "0"; // Use first token
    await this.veigarNFT.approve(this.collector, tokenId);
    expect(await this.veigarNFT.getApproved(tokenId)).to.equal(this.collector);
  });

  it('Reverts when trying to get tokenURI of non-existent token', async function () {
    await expect(this.veigarNFT.tokenURI(999)).to.be.revertedWith("Token does not exist");
  });
});
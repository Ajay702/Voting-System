# Voting System

## Overview

This project is a decentralized Voting System built using Solidity and deployed on the Ethereum blockchain. The system allows for secure, transparent, and tamper-proof voting processes, leveraging blockchain technology to ensure the integrity of votes.

## Features

- **Decentralized Voting**: Votes are recorded on the Ethereum blockchain, ensuring transparency and security.
- **Candidate Registration**: Users can register as candidates for the election.
- **Voter Registration**: Users must register as voters to participate in the voting process.
- **Vote Casting**: Registered voters can cast their votes for the registered candidates.
- **Results Tallying**: Votes are automatically tallied, and the winner is determined after the voting period ends.
- **Secure and Transparent**: The use of blockchain ensures that all votes are immutable and publicly verifiable.

## Prerequisites

To run this project locally, you'll need:

- **Node.js**: Make sure you have Node.js installed.
- **Hardhat**: The project uses Hardhat for deployment and testing.
- **MetaMask**: A browser extension wallet to interact with the Ethereum blockchain.

## Getting Started

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.


After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Authors

Ajay Raghav

## License

This project is licensed under the MIT License.

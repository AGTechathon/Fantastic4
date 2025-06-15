**CampusVote – Decentralized Voting System for Campus Elections**

**# Overview**
CampusVote is a secure, decentralized voting platform used for campus elections. It utilizes blockchain technology(.sol) to ensure transparent, tamper-proof voting, allowing students to cast their votes digitally with verifiable integrity.


**# Features Built**

_**Blockchain Integration**_
Smart Contracts developed with Hardhat and Solidity

Voting logic deployed on a local Ethereum-compatible blockchain (e.g., Hardhat/Ethereum testnet)

Contract functions:

Add candidate

Vote for candidate

View vote counts


_**Secure Login System**_ 
Clerk Authentication integrated

Student login with Stud DB email-based OTP verification

Admin(superuser) login secured to prevent unauthorized access

Role-based login and access system (Student/Admin)


 _**Frontend UI**  _
Built with Next.js, React, Tailwind CSS, and Ethers.js

Separate dashboards for Students and Admins

Student: See candidate list and cast votes

Admin: View results, manage elections

MetaMask wallet integration (for alternate future login)

_**Backend + Blockchain Integration**  _
Smart contracts connected to the interface using ethers.js

Frontend and backend tested with local Hardhat node

Deployed wallet-connected voting transactions with feedback messages




**Tech Stack**
Layer	Tech/Tool
Frontend	Next.js, React, Tailwind CSS
Backend	Node.js (Express optional), Ethers.js
Blockchain	Hardhat, Solidity
Auth	Clerk (OTP Email Login)
Wallet	MetaMask (for blockchain transactions)
Versioning	GitHub




**Team**
Fantastic 4

Sanket Rajput (Lead Dev)
Atharv Navatre
Vaibhav Yadav
Pruthviraj Gavhane



**User Flow: CampusVote Voting Process**

_1. Sign In (Student Login via OTP or Clerk)_
User enters their Student ID/email.

An OTP is sent to the registered email.

On successful OTP verification, the user is authenticated via Clerk.


_2. Connect Wallet (MetaMask Integration)_ 
After sign-in, the student is prompted to connect their MetaMask wallet.

The wallet is verified on-chain (e.g., through a signed message or event).

This step ties the student’s voting identity to a unique wallet address.

_3. Check Voting Status (One-Person-One-Vote)_ 
The system checks if this wallet address (or student ID) has already voted:

On-chain: Check a smart contract mapping (e.g., hasVoted[address] == true)

Off-chain (optional): Cross-check with the student ID stored during sign-in

_4. Cast Vote_
User selects their candidate.

The vote is recorded on the blockchain via a smart contract function like castVote(candidateId).

The voter’s address is marked as voted, preventing future votes.




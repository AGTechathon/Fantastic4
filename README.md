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




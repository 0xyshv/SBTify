## SBTify

SBTify is a decentralised identity and credentials management protocol on Scroll Sepolia chain. SBTify is your gateway to sovereign identity. We are leveraging Scroll Infrastructure to mint digital identities and credentials as NFTs (in form of SBTs).

## Table of Contents

1. [All Links](#links)
2. [Instructions to setup and run locally ](#instructions-to-setup)
3. [Deployed Contracts](#deployed-contracts)
4. [Protocol Specs](#protocol-specs)
5. [System Design](#system-design)
6. [App Demo](#app-demo)
7. [Tech Stack](#tech-stack)
8. [Our Solution (Architecture)](#our-solution-architecture)
9. [Contact Info](#contact-info)

## Links

- [Deployed URL](https://sb-tify.vercel.app/)

## Instructions to Setup

Follow these instructions to set up and run the project:

**Using Github**

- Clone the Git repository: `https://github.com/0xAlphaDevs/SBTify.git`
- Install project dependencies: `pnpm install`
- Start the development server: `pnpm run dev`
- Access the web app in your browser at [http://localhost:3000](http://localhost:3000)

## Deployed Contracts

- Authorization Token : [`0x415c26A2686000E9D8Dc65e3282697f073A0e9EE`](https://sepolia.scrollscan.com/address/0x415c26A2686000E9D8Dc65e3282697f073A0e9EE#code)
- Educational ID : [`0xf113B8bb4bd7CBE6aA291c918D5289A06361F269`](https://sepolia.scrollscan.com/address/0xf113B8bb4bd7CBE6aA291c918D5289A06361F269#code)
- Employee ID : [`0xD5Eec5AaEE792ef19a22B2cf8Ac9D74aB1fEc200`](https://sepolia.scrollscan.com/address/0xD5Eec5AaEE792ef19a22B2cf8Ac9D74aB1fEc200#code)
- National ID : [`0x5421b8fc58c16330402e2Ec72FDb23E59dE99500`](https://sepolia.scrollscan.com/address/0x5421b8fc58c16330402e2Ec72FDb23E59dE99500#code)
- Passport ID : [`0x2ed1aD0bea7508D1fd1458F8a06154147Ed0511C`](https://sepolia.scrollscan.com/address/0x2ed1aD0bea7508D1fd1458F8a06154147Ed0511C#code)

## Protocol Specs

- Scroll Sepolia Testnet
- Scroll scan for verifying smart contracts.
- Solidity & Hardhat for contracts development
- Tailwind CSS & Material Tailwind ( UI )
- Next JS & Vercel (Front-end & Deployment)

## System Design

![image](./public/sd.png)

## App Demo

![image](./public/ad1.jpeg)
![image](./public/ad2.jpeg)
![image](./public/ad3.jpeg)
![image](./public/ad4.jpeg)
![image](./public/ad5.jpeg)
![image](./public/ad6.jpeg)
![image](./public/ad7.jpeg)

## Tech Stack

- Scroll Sepolia Testnet
- ScrollScan
- Next JS
- Typescript
- Tailwind CSS
- Material Tailwind
- Connectkit
- wagmi
- view
- @wagmi/core
- Hardhat
- Solidity

## Our Solution (Architecture)

### Admin

- You can register as an Admin by providing your name and industry after connecting your wallet.
- An authorization token will be minted against the admin address to verify in future that the admin is registered or not on SBTify.
- If registered you will be taken to the admin dashboard.
- An admin can issue the SBTify specified SBTs to users.
- Can send verification requests for SBTs.

### User

- You can register as a User by providing your name after connecting your wallet.
- An authorization token will be minted against the user address to verify in future that the user is registered or not on SBTify.
- If registered you will be taken to the user dashboard.
- A user can view the SBTify owned SBTs .
- Can approve verification requests from admins.

## Contact Info

### Github

[Yashasvi Chaudhary](https://github.com/0xyshv)

### Twitter / X

[Yashasvi Chaudhary](https://twitter.com/0xyshv)

## Thanks

---
title:      Project Blog 3 | Starting Project
layout:     post
date:       2018-01-24
image: /assets/images/markdown.jpg
headerImage: false
tag:
- Project
- Ethereum
category: blog
use_math: true
author: Patrick H Morris
description: Project proposal and investigation into Ethereum Blockchain
---

For the month before this week, most of my time was taken up with my christmas exams. My intention was to have the mockups, deployer contract and the paillier program done before the Christmas. I fell behind schedule on this and made up for it this week to be on schedule with the registration and voting contracts beginning on the 27th. 

![](/images/3/ganntFinal.png)

Progress was made in the set up of the project where I created a kanban scheduling system that comes with the newest version of Gitlab. This can be found [here](https://gitlab.computing.dcu.ie/morrip25/2018-ca400-morrip25/boards). I also researched a framework for git where many articles recommending the [git flow](http://nvie.com/posts/a-successful-git-branching-model/) model which I will utilise throughout the development pipeline.
 
## UI-Mockups

The outline of the user-interface is divided into three sections. Tally, Voting and Administration. For this blog I will explain the Tally and Voting. The Admin interface has not been finalised as I am still undecided how the administrator will be able describe elections of multiple types.

As of now, the application layout is as below:

![](/images/3/sitemap.png)

<!--- Explain the cryptokitties, dapps, truffle development schedule and react --->

### Landing Page

![](/images/3/Landing.png)

Above is the landing page for the dapp. First examining the header section is a search bar. This search bar is used by inserting an address and depending on the stage of the election, the user will be navigated to the correct section for that stage. This is explained later in the Election page section.

The toggle switch in the right-hand corner is an indication on whether the application is connected to the users account. This is done through web3.js and allows the user to "sign-in" only using their account details. All transactions to the blockchain are handled via metamask and for every operation to the chain, metamask provides an interface for the user.

Other features like the video tutorial and project-related information will be displayed here. The bottom portion is an example footer that as of yet has no functionality but may do so as the project is developed.

### Tally Page

![](/images/3/tally.png)

The Tally page displays the result of the election. The above rough detail of it displays candidate "cards" which pull data from candidate's ipfs node and the blockchain itself. These cards will be utilised elsewhere in the voting and registration sections. They will also link to an individual candidates page which displays more information for that candidate.

Below that again is the results which shows the election result. The data is shown as a pie chart but further analytics could be used to visualise the result and is subject to change on the basis of what electoral system is being used.

The data is calculated on the client side, the encrypted valid votes are taken from the blockchain, decrypted and calculated to produce the election results. These encrypted votes are displayed in the next section which is linked via the "Check Your Vote" button.

### Election Votes

![](/images/3/electionVotes.png)

The election votes is a utility where a voter can check that their vote was submitted and counted in the election. The voting process enforces the voter to post their vote as an encrypted hash. This hash is unique to that user and can allow a user reference that their vote was counted. The voter can inspect all other submitted votes in the election and can tally the votes if they want to using the paillier encryption function used in the system. 

### Candidate Info

![](/images/3/candidate.png)

This page displays candidate information for the election. The purpose of this page is so that any user who is viewing the election can view the particpants and observe who the candidates are and why they are running in an election. What is shown is a candidates profile picture, election video and manifesto but could be extended later.

Both the profile picture and video are to be stored in a decentralized manner using [ipfs](https://ipfs.io/). These would run on the candidates node and be seeded to the network so everyone can pull this data. What is stored on the blockchain is the manifesto and the links to the candidates ipfs address.

### Election Page

![](/images/3/election.png)

The election page is just a simple navigation page which operates the same functionality as the search bar at the top of the page. A user would submit an election's address and on the basis of the status of that election and the status of the relationship the user has with that election, they will be navigated to their correct stage.

For example:

1. Unregistered user inside Registration window -> Navigated to registration page
2. Registered user before Voting window -> Navigated to voting page showing voting time window       
3. Registered user inside Voting window -> Navigated to voting page 
4. Registered user after Voting window -> Navigated to tally page showing results of that election
5. Unregistered user outside Registration window -> Navigated to tally page                                   
6. Unregistered user outside Voting window -> Navigated to tally page showing results of that election

### Voter Registration Page

![](/images/3/voterRegister.png)

The registration page of an election is composed of two parts. The first is where the user submits their information to the administrator to identify themselves as valid participants in the election. The second is a random number which is submitted to the registration contract. 
The administrator receives the identification data, cross-references it with their electoral-roll and executes a validation function on the smart contract if the sender is a valid participant.
The user can also, quickly switch between views via a toggle button in the top corner to the candidate registration. This will default to the voter registration as it would be the most widely used.
 
The exectution of the p2p message is done through a protocol called [whisper](https://github.com/ethereum/wiki/wiki/Whisper) which is used to route messages across nodes on the ethereum network. This method keeps inline with the decentralised ethos of the project. In the functional spec, I had designed that the user would register using their personal government ID or agree outside of the system on an identification number with the administrator. 
This felt a bit clunky and insecure to have personal information stored publicly. On discovery of the whisper protocol, I thought the registration process could be more streamlined and could be automated on the administrator side also.

### Candidate Registration Page

![](/images/3/candidateRegister.png)

The registration page for candidates is an extension of that for the voters. On this page, candidates also register as voters but attach their relevant election data which they host on their own node. Below that is the candidates list for all candidates who have registered for the election up to that point.

A function that could be implemented post basic functionality is a nomination process where registered voters can elect to nominate other people as candidates. This would mean that a user would put themselves forward as a candidate and would require nominations which are sent to the administrator who would then validate the user as a candidate for the election if they required enough nominations. As of now, this function is not implemented but could be added in the future.

### Voting Page

![](/images/3/voting.png)

The voting page is used for a voter their vote to the smart contract. This page displays a plurality electoral system where a user has 1 vote and selects a single candidate, however where the system is different the number of votes and the selection of candidates will change. 

When the user selects the submit button, a popup will ask them to confirm their selection and on confirmation the vote will be submitted to the blockchain. The submission will be shown as an encrypted number which the user can remember and be used to reference that their vote was submitted on the blockchain. When their vote is submitted, they will be able to see their submitted vote in the Election Votes page. 

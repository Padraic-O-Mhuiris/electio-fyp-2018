import React, { Component } from 'react'
import admin from  '../../assets/images/admin.png'
import voter from  '../../assets/images/voter.png'
import candidate from  '../../assets/images/candidate.png'
import observer from  '../../assets/images/observer.png'
import central from '../../assets/images/central.png'
import decentral from '../../assets/images/decentral.png'

import admingif from '../../assets/gifs/admin.gif'
import searchgif from '../../assets/gifs/search.gif'
import startgif from '../../assets/gifs/start.gif'
import reg_votergif from '../../assets/gifs/voterReg.gif'
import validategif from '../../assets/gifs/validate.gif'
import nominategif from '../../assets/gifs/nominate.gif'
import votinggif from '../../assets/gifs/voting.gif'
import tallygif from '../../assets/gifs/tally.gif'


import 'font-awesome/css/font-awesome.css'

const Steps = () => (
    <div className="steps stepx">
    <div className="step-item is-active">
      <div className="step-marker">
      <span className="icon">
            <i className="fa fa-map-marker"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Pre-Election</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker">
      </div>
      <div className="step-details">
        <p className="step-title">Registration</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker">
      </div>
      <div className="step-details">
        <p className="step-title">Pre-Voting</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker">
      </div>
      <div className="step-details">
        <p className="step-title">Voting</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker">
      </div>
      <div className="step-details">
        <p className="step-title">Post-Voting</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker">
      </div>
      <div className="step-details">
        <p className="step-title">Tally</p>
      </div>
    </div>
  </div>
)

class HomePage extends Component {
  
  render() {
        return(
            <div className="column is-12 home box">
                <section className="hero is-large">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns has-text-centered">
                                <div className="column is-2"></div>
                                <div className="column is-3">
                                <div className="space">
                                    <div className="elogo">
                                        <div className="trif u1"></div>
                                        <div className="trif u2"></div>
                                        <div className="trif u3"></div>
                                        <div className="trif u4"></div>
                                        <div className="ct"></div>
                                        <div className="trif l1"></div>
                                        <div className="trif l2"></div>
                                        <div className="trif l3"></div>
                                        <div className="trif l4"></div>
                                    </div>
                                </div>
                                
                                </div>
                                <div className="column is-5">
                                    <h1 className="title">electio</h1>
                                    <br/>
                                    <h2 className="subtitle">A blockchain-powered, decentralised e-voting application</h2>
                                    <div className="is-divider"></div>
                                    <p className="content">Electio is an e-voting application that allows election administrators to design an electoral system fit for their uses. The system strengthens democracy by applying a decentralised tallying system. By using the ethereum blockchain, consensus can be determined as to the state of the votes, thereby removing the need for a central tallying process in the election system, voters can count the votes themselves locally.</p>
                                </div>
                                <div className="column is-2"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="is-divider"></div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns has-text-centered ">
                                    <div className="column is-3"></div>
                                    <div className="column is-6">
                                    <h2 className="subtitle">Who can use Electio?</h2>
                                    <p className="content">Electio divides the participants in an election into 4 distinct groups. Electio enables each person to act out their role in the election. These are explained below</p>
                                </div>
                                <div className="column is-3"></div>
                            </div>
                            <br/>

                            <div className="columns has-text-centered">
                                <div className="column is-5">                         
                                    <figure>
                                        <img src={admin}/>
                                    </figure>
                                    <br/>
                                    <h2 className="subtitle">Admins</h2>
                                    <p className="content">Admins are the owners of elections. It is on their own authority to generate the election and for them to regulate who the participants are. In motion voting, they are also responsible for generating the motion and the choices that are to be voted on. In all elections they are to also provide keys which allows users to encrypt their votes and also for them to hide their votes.</p>
                                </div>
                                <div className="column is-2"></div>  
                                <div className="column is-5">                         
                                    <figure>
                                        <img src={voter}/>
                                    </figure>
                                    <br/>
                                    <h2 className="subtitle">Voters</h2>
                                    <p className="content">Voters are the essential users in any election. Electio simplifies the registration process for voters where they are to submit an auto-generated election-id to the blockchain and also provide the administrator with it externally. From there, they are authenticated and can vote in the election!</p>
                                </div>
                            </div>
                            <br/>
                            <div className="columns has-text-centered">
                                <div className="column is-5">                         
                                    <figure>
                                        <img src={candidate}/>
                                    </figure>
                                    <br/>
                                    <h2 className="subtitle">Candidates</h2>
                                    <p className="content">Candidates in Electio can also easily register for an election. They provide their election details and are then identified as applied. In order for an applied candidate to become a valid candidate, they must canvas for nominations from valid voters. Voters who wish to nominate a candidate can do so once. When the candidate has filled the nomination limit they are validated. Voters can vote for them in the following stages</p>
                                </div>
                                <div className="column is-2"></div> 
                                <div className="column is-5">                         
                                    <figure>
                                        <img src={observer}/>
                                    </figure>
                                    <br/>
                                    <h2 className="subtitle">Observers</h2>
                                    <p className="content">Observers are people who are not directly involved in an election. They can be anyone who accesses Electio. Observers can apply to elections but even if its the case that they miss out on an election, they can still view the tally. The tally is globally observable for all people, this is important as it increases the validity of an election when everyone can view the result</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="break1"></div>
                <div className="is-divider"></div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns has-text-centered">
                                <div className="column is-2"></div>
                                <div className="column is-8">
                                <h2 className="subtitle">How does it work?</h2>
                                
                                <p className="content">The election process is split up into a number of stages as below. These stages are set to the blockchain via time windows so there is consensus on the state of the election at any given time</p>
                                <br/>
                                <Steps/>
                                <br/>
                                </div>
                                <div className="column is-2"></div>
                                
                            </div>
                            <div className="break2"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-6">
                                    <figure className="image admin">
                                        <img src={admingif}/>
                                    </figure>
                                </div>
                                <div className="column is-1"></div>
                                <div className="column is-5">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Election Creation</h2>
                                    <p className="content">An election can be created by anyone. Once created they become the administrator and are responsible for securing the election. An admin can choose between three election types, Plurality, Motion and Single Transferable Vote. The form is to be filled in differently dependent on which election type is chosen. Click submit and a new election is created in the pre-election stage</p>
                                </div>
                            </div>

                            <div className="break1"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-4">
                                    <h2 className="subtitle">Finding An Election</h2>
                                    <p className="content">Finding an election is very easy. Each election is represented by a code like this: </p>
                                    <h2 className="subtitle-monospace">0x7e39704d0FB1DFd96c73CE967e84249B095fcA7F</h2>
                                    <br/>
                                    <p className="content">Users can insert the code into the searchbar and the election will be represented. Elections where the user has participated can be accessed via the hamburger menu.</p>
                                </div>
                                <div className="column is-1"></div>
                                <div className="column is-8">
                                    <figure className="image voter">
                                        <img src={searchgif}/>
                                    </figure>
                                </div>
                            </div>

                            <div className="break1"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-8">
                                    <figure className="image candidate">
                                        <img src={startgif}/>
                                    </figure>
                                </div>
                                <div className="column is-4">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Starting An Election</h2>
                                    <p className="content">The admin starts the election in the "Pre-Election" phase. All he has to do is set a window of time into the future. This first period is for users to register as voters or candidates. A second time window is to be declared later in the voting stage. When submitting the times, a transaction is made to the blockchain</p>
                                </div>
                            </div>

                            <div className="break1"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-4">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Registering For An Election</h2>
                                    <p className="content">
                                    Users who wish to vote select the voter section during the registration phase. The user is given a random election ID which they are to submit to the blockchain. 
                                    </p>
                                </div>
                                <div className="column is-8">
                                    <figure className="image observer">
                                        <img src={reg_votergif}/>
                                    </figure>
                                </div>
                            </div>

                            <div className="break1"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-8">
                                    <figure className="image admin">
                                        <img src={validategif}/>
                                    </figure>
                                </div>
                                <div className="column is-4">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Validating Voters</h2>
                                    <p className="content">The election ID is also meant to be sent to the admin externally to this application. By doing this a user can identify themselves to the admin who can verify the voters identity. They share their election ID and then the admin can elect to validate or invalidate them on the blockchain</p>
                                </div>
                            </div>

                            <div className="break1"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-4">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Nominating Candidates</h2>
                                    <p className="content">
                                    Once a voter has been validated and if the registration window is still open, voters can nominate a candidate. Their nomination is recorded on the blockchain. A nomination limit is set by the admin when the election was created. When an applied candidate receives enough nominations, they become valid candidates
                                    </p>
                                </div>
                                <div className="column is-8">
                                    <figure className="image voter">
                                        <img src={reg_votergif}/>
                                    </figure>
                                </div>
                            </div>

                            <div className="break1"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-8">
                                    <figure className="image candidate">
                                        <img src={votinggif}/>
                                    </figure>
                                </div>
                                <div className="column is-4">

                                    <div className="break2"></div>
                                    <h2 className="subtitle">Voting</h2>
                                    <p className="content">
                                    When the registration period has passed, the administrator can start the voting period. When started, valid voters can submit their votes encrypted so that nobody else can see what their vote was. These votes are encrypted using a special key which scrambles it into a long code. This stage is represented differently depending on the election type
                                    </p>
                                </div>
                            </div>

                            <div className="break1"></div>
                            <div className="columns has-text-centered box">
                                <div className="column is-4">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Tallying</h2>
                                    <p className="content">
                                    Once the voting period is over the admin releases the decryption key which is used to tally the votes. Tallying of the votes is done automatically and is viewable by everyone who accesses the election at that point.
                                    </p>
                                </div>
                                <div className="column is-8">
                                    <figure className="image observer">
                                        <img src={tallygif}/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>                    
                    </section>
                    <div className="break1"></div>
                    <div className="is-divider"></div>
                    <section className="hero">
                        <div className="hero-body">
                            <div className="container">
                                <div className="columns has-text-centered">
                                    <div className="column is-2"></div>
                                    <div className="column is-8">
                                        <h2 className="subtitle">Why use Electio?</h2>
                                        <p className="content">
                                        There is a famous quote that was supposedly said by Joseph Stalin which captures the importance of the election process.
                                        </p>
                                        <div className="notification">
                                        <p className="quote">"It's not the people who vote that count, it's the people who count the votes." - J.Stalin</p> 
                                        </div>
                                        <p className="content">
                                        Blockchain technology can provide a desirable solution to e-voting and the trust that people must have in people who control elections.
                                        </p>
                                    </div>
                                    <div className="column is-2"></div>
                                </div>  
                                <div className="break2"></div>
                                <div className="columns has-text-centered">
                                    <div className="column is-6">
                                    <figure>
                                        <img src={central}/>
                                    </figure>
                                    </div>
                                    <div className="column is-1"></div>
                                    <div className="column is-5">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Centralised Systems</h2>
                                    <p className="content">
                                        If a system is centralised, it means that there is a single point inside that system that does all the work. In context of voting this is the tallying machine, the machine which counts all the votes in an election. This is a major security risk and threat to democracy should this machine become compromised by potential bad actors. 
                                    </p>
                                    </div>
                                </div>
                                <div className="break2"></div>
                                <div className="columns has-text-centered">
                                    
                                    <div className="column is-5">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Decentralised Systems</h2>
                                    <p className="content">
                                        In decentralised systems, the point of work inside the system is distributed amongst all actors of the system. Where this is applicable to electio is that each user of the system has a copy of the election from the blockchain and they can tally the votes themselves.
                                        <br/>
                                        <br/>
                                        This makes the act of changing the results of the election insurmountably harder for bad actors as they have to alter everyones copy of the election.
                                    </p>
                                    </div>
                                    <div className="column is-1"></div>
                                    <div className="column is-6">
                                        <figure>
                                            <img src={decentral}/>
                                        </figure>
                                    </div>
                                    
                                </div>  
                                <div className="break2"></div>
                                <div className="columns has-text-centered">
                                    <div className="column is-6">
                                    <iframe width="720" height="400" src="https://www.youtube.com/embed/TDGq4aeevgY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                    </div>
                                    <div className="column is-1"></div>
                                    <div className="column is-5">
                                    <div className="break2"></div>
                                    <h2 className="subtitle">Ethereum</h2>
                                    <p className="content">
                                        Ethereum is best described as a blockchain which acts as a global computer. The Ethereum network acts as a platform where people can deploy "Dapps" (decentralised applications) onto it and interact with these applications at the cost of Ξ (eth). This video explains ethereum in better detail
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </section>
                    <div className="break1"></div>
                    <div className="break1"></div>
                    <div className="break1"></div>
            </div>
        )
    } 
  
}

export default HomePage

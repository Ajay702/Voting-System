import { useState, useEffect } from "react";
import { ethers } from "ethers";
import voting_abi from "../artifacts/contracts/Voting.sol/Voting.json";

export default function VotingPage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [votingContract, setVotingContract] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  const contractAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
  const votingABI = voting_abi.abi;

  const getWallet = async () => {
    try {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
      }

      if (ethWallet) {
        const accounts = await ethWallet.request({ method: "eth_accounts" });
        handleAccount(accounts);
      }
    } catch (error) {
      console.error("Error getting wallet:", error);
    }
  };

  const handleAccount = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      await getVotingContract();
    } else {
      console.log("No accounts found");
    }
  };

  const getVotingContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, votingABI, signer);
      setVotingContract(contract);
      await getCandidates(contract);
    } catch (error) {
      console.error("Error getting contract:", error);
    }
  };

  const getCandidates = async (contract) => {
    try {
      const candidatesCount = await contract.candidatesCount();
      const candidatesArray = [];
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.candidates(i);
        candidatesArray.push({ id: i, name: candidate.name, voteCount: candidate.voteCount.toNumber() });
      }
      setCandidates(candidatesArray);
    } catch (error) {
      console.error("Error getting candidates:", error);
    }
  };

  const vote = async (candidateId) => {
    try {
      const tx = await votingContract.vote(candidateId);
      await tx.wait();
      setHasVoted(true);
      await getCandidates(votingContract); 
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    getWallet();
  }, [ethWallet]);

  return (
    <div>
      <h1>Welcome to the Voting Machine!</h1>
      <p>Your Account: {account}</p>
      <p>Has Voted: {hasVoted ? "Yes" : "No"}</p>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.voteCount} votes
            {!hasVoted && <button onClick={() => vote(candidate.id)}>Vote</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
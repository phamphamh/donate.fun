// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CampaignManager {
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    struct Campaign {
        address owner;
        string name;
        string description;
        string[] images;
        uint256 currentDistributionPhase;
        DistributionPhase[] distributionPhases;
        uint256 totalContributors;
        uint256 totalContributions;
        bool contributionPhaseFinished;
        bool isCampaign;
    }

    struct DistributionPhase {
        uint256 amount;
        string howToProve;
    }

    struct Vote {
        bool isFinished;
        bool isApproved;
        uint256 yesVotes;
        uint256 noVotes;
    }

    uint256 public campaignCount;

    // campaignId => campaign
    mapping(uint256 => Campaign) public campaigns;

    // campaignId => contributor => contribution amount
    mapping(uint256 => mapping(address => uint256)) public contributions;

    // campaignId => voteIndex => vote
    mapping(uint256 => mapping(uint256 => Vote)) public votes;

    // campaignId => voteIndex => voter => has voted
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public hasVoted;

    function createCampaign(
        string memory name,
        string memory description,
        string[] memory images,
        DistributionPhase[] memory distributionPhases
    ) public {
        Campaign storage campaign = campaigns[campaignCount];
        campaign.owner = msg.sender;
        campaign.name = name;
        campaign.description = description;
        campaign.images = images;

        // Manually copy each distribution phase
        for (uint256 i = 0; i < distributionPhases.length; i++) {
            campaign.distributionPhases.push(
                DistributionPhase({amount: distributionPhases[i].amount, howToProve: distributionPhases[i].howToProve})
            );
        }

        campaign.isCampaign = true;
        campaigns[campaignCount] = campaign;
        campaignCount++;
    }

    function contribute(uint256 campaignId) public payable {
        Campaign storage campaign = campaigns[campaignId];

        campaign.totalContributions += msg.value;
        if (contributions[campaignId][msg.sender] == 0) {
            campaign.totalContributors++;
        }
        contributions[campaignId][msg.sender] += msg.value;
    }

    function voteForDistributionPhase(uint256 campaignId, bool agree) public {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.isCampaign, "Campaign does not exist");
        require(
            campaign.currentDistributionPhase < campaign.distributionPhases.length, "Distribution phase does not exist"
        );

        Vote storage phaseVote = votes[campaignId][campaign.currentDistributionPhase];

        require(!phaseVote.isFinished, "Vote already finished");
        require(!hasVoted[campaignId][campaign.currentDistributionPhase][msg.sender], "Already voted");

        if (agree) {
            phaseVote.yesVotes++;
        } else {
            phaseVote.noVotes++;
        }

        hasVoted[campaignId][campaign.currentDistributionPhase][msg.sender] = true;

        // Check if 4/6 of total votes are in
        uint256 totalVotes = phaseVote.yesVotes + phaseVote.noVotes;
        uint256 requiredVotes = (campaign.totalContributors * 4) / 6;
        if (totalVotes >= requiredVotes) {
            phaseVote.isFinished = true;
            phaseVote.isApproved = phaseVote.yesVotes > phaseVote.noVotes;

            if (phaseVote.isApproved) {
                (bool success,) = campaign.owner.call{
                    value: campaign.distributionPhases[campaign.currentDistributionPhase].amount
                }("");
                require(success, "Transfer failed");
            }

            campaign.currentDistributionPhase++;
        }
    }

    function execute(address to, uint256 value, bytes memory data) public {
        require(msg.sender == owner, "Only owner can execute");
        (bool success,) = to.call{value: value}(data);
        require(success, "Execution failed");
    }
}

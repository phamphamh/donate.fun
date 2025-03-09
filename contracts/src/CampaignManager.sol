// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract CampaignManager {
    IERC20 public immutable paymentToken;

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
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

    function contribute(uint256 campaignId, uint256 amount) public {
        Campaign storage campaign = campaigns[campaignId];

        campaign.totalContributions += amount;
        if (contributions[campaignId][msg.sender] == 0) {
            campaign.totalContributors++;
        }
        contributions[campaignId][msg.sender] += amount;
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
                paymentToken.transfer(
                    campaign.owner, campaign.distributionPhases[campaign.currentDistributionPhase].amount
                );
            }

            campaign.currentDistributionPhase++;
        }
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {CampaignManager} from "../src/CampaignManager.sol";

contract CampaignManagerTest is Test {
    CampaignManager public manager;

    function setUp() public {
        manager = new CampaignManager(address(0));
    }
}

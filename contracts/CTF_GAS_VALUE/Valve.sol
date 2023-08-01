// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

interface INozzle {
    function insert() external returns (bool);
}



contract Valve {
    bool public open;
    bool public lastResult;

    function useNozzle(INozzle nozzle) public returns (bool) {
        try nozzle.insert() returns (bool result) {
            lastResult = result;
            return result;
        } catch {
            lastResult = false;
            return false;
        }
    }



    function openValve(INozzle nozzle) external {
        open = true;
        (bool success,) = address(this).call(
            abi.encodeWithSelector(
                this.useNozzle.selector,
                nozzle
                )
            );
        require(!success);
    }
}

pragma solidity ^0.5.0;

library MathLibrary {
    function mult(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }
}

contract LibraryDemo {
    using MathLibrary for uint256;

    function multiply(uint256 _a, uint256 _b) public pure returns (uint256) {
        return _a.mult(_b);
    }
}

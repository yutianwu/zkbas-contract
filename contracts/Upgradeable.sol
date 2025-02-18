// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.7.6;

/// @title Interface of the upgradeable contract
/// @author Zkbas Team
interface Upgradeable {
    /// @notice Upgrades target of upgradeable contract
    /// @param newTarget New target
    /// @param newTargetInitializationParameters New target initialization parameters
    function upgradeTarget(address newTarget, bytes calldata newTargetInitializationParameters) external;
}

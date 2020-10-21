There are 3 important contracts.

* `Token` - Token contract. No dependency with any other contract
* `Timelock` - Timelock contract. The passed proposals will be queued, then after the delay it'll be executed.
* `GovernorAlpha` - Governance contract. Create proposals, vote on them, execute them etc...

## Token

3 constructor arguments.

* `account` - Initial holder of all the tokens.
* `minter` - Set (future) minter account
* `mintingAllowedAfter` - Future timestamp. Only after this timestamp, more minting will be allowed

Normal ERC-20 methods including `permit`. `setMinter` to change the `minter` address.

There are few methods related to delegating. [More about delegating methods](https://compound.finance/docs/governance)

## GovernorAlpha & Timelock

`Timelock` has 2 constructor arguments - `admin` and `delay`. Admin should be the governance contract to execute the proposals and delay in time period.

`GovernorAlpha` has 3 constructor arguments - `timelock` (Timelock address), `tkn` (Token address) & `guardian` (Governance guardian).

Since governance contract needs timelock address, timelock contract should be deployed first with a different admin address (address should be accessible)

Then the governance contract should be deployed. Timelock has a `setPendingAdmin` method to change the admin which should be called by the current admin via `queueTransaction` method to queue the transaction, and set the pending admin as the governance contract. Once the delay on the timelock contract is completed, current admin should `executeTransaction`.

After this, the new admin (governance contract) should accept admin status via `acceptAdmin` method. Which is called from `GovernorAlpha` via `__acceptAdmin` method.

Once this process is complete, governance is ready.

Then proposals can me made via `propose` method. Once passed `queue` can be called to queue the transaction to the timelock. `execute` to execute after timelock delay.
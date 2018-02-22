import { Augur } from "augur.js";
import * as Knex from "knex";
import { FormattedEventLog, ErrorCallback } from "../../types";
import { augurEmitter } from "../../events";
import { refreshPositionInMarket } from "./order-filled/refresh-position-in-market";

export function processCompleteSetsPurchasedOrSoldLog(db: Knex, augur: Augur, log: FormattedEventLog, callback: ErrorCallback): void {
  const blockNumber: number = log.blockNumber;
  const marketId = log.market;
  const account = log.account;
  refreshPositionInMarket(db, augur, marketId, account, (err: Error|null) => {
    if (err) return callback(err);
    const completeSetPurchasedData = {
      marketId,
      account,
      blockNumber,
      transactionHash: log.transactionHash,
      logIndex: log.logIndex,
      tradeGroupId: log.tradeGroupId,
      numPurchased: log.numCompleteSets,
    };
    augurEmitter.emit(log.eventName, completeSetPurchasedData);
    callback(null);
  });
}

export function processCompleteSetsPurchasedOrSoldLogRemoval(db: Knex, augur: Augur, log: FormattedEventLog, callback: ErrorCallback): void {
  refreshPositionInMarket(db, augur, log.market, log.account, (err: Error|null) => {
    if (err) return callback(err);
    augurEmitter.emit(log.eventName, log);
    callback(null);
  });
}
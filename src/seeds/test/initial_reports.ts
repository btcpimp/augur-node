import * as Knex from "knex";

exports.seed = async (knex: Knex): Promise<any> => {
  // Deletes ALL existing entries
  return knex("initial_reports").del().then(async (): Promise<any> => {
    // Inserts seed entries
    const seedData = [{
      marketId: "0x0000000000000000000000000000000000000011",
      reporter: "0x0000000000000000000000000000000000000b0b",
      payoutId: 1,
      isDesignatedReporter: false,
      amountStaked: 102,
      initialReporter: "0x0000000000000000000000000000000000abe123",
      redeemed: false,
    }, {
      marketId: "0x0000000000000000000000000000000000000211",
      reporter: "0x0000000000000000000000000000000000000b0b",
      payoutId: 5,
      isDesignatedReporter: true,
      amountStaked: 102,
      initialReporter: "0x0000000000000000000000000000000000abe321",
      redeemed: false,
    },
    ];
    return knex.batchInsert("initial_reports", seedData, seedData.length);
  });
};
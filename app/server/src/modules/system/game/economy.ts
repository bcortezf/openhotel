import { log } from "shared/utils/log.utils.ts";
import { System } from "../main.ts";
import { ulid } from "@std/ulid";
import { TransactionType } from "shared/enums/economy.enum.ts";
import { Transaction, TransactionParams } from "shared/types/economy.types.ts";
import {
  buildAtomicTransaction,
  getBalanceEntry,
  validateBalance,
} from "shared/utils/economy.utils.ts";

export const economy = () => {
  const load = async () => {
    log("> Loading economy...");

    // await executeTransaction({
    //   type: TransactionType.PURCHASE,
    //   description: "catalog - silla",
    //   amount: 10,
    //   fromAccount: "01JRMG847JP57CPYG06NPX8R92",
    //   toAccount: "hotel",
    //   meta: {
    //     furnitureId: 1,
    //   },
    // });

    log("> Economy loaded!");
  };

  const getHotelBalance = async (): Promise<number> => {
    return await System.db.get(["hotel", "balance"]);
  };

  const executeTransaction = async (params: TransactionParams) => {
    const { type, description, amount, fromAccount, toAccount, meta } = params;

    if (amount <= 0) {
      throw new Error("The amount must be greater than zero.");
    }

    try {
      const atomic = System.db.atomic();

      switch (type) {
        case TransactionType.REWARD:
        case TransactionType.REFUND: {
          // Flow: Hotel -> User
          if (!toAccount)
            throw new Error(
              "toAccount is required for reward/refund transactions.",
            );

          const [hotelEntry, toEntry] = await Promise.all([
            getBalanceEntry("hotel"),
            getBalanceEntry("users", toAccount),
          ]);

          validateBalance(hotelEntry, amount);
          validateBalance(toEntry, 0);

          buildAtomicTransaction(atomic, hotelEntry, toEntry, amount);
          break;
        }

        case TransactionType.PURCHASE: {
          // Flow: User -> Hotel
          if (!fromAccount)
            throw new Error(
              "fromAccount is required for purchase transactions.",
            );

          const [userEntry, hotelEntry] = await Promise.all([
            getBalanceEntry("users", fromAccount),
            getBalanceEntry("hotel"),
          ]);

          validateBalance(userEntry, amount);
          validateBalance(hotelEntry, 0);

          buildAtomicTransaction(atomic, userEntry, hotelEntry, amount);
          break;
        }

        case TransactionType.DEPOSIT:
          // Flow: onet -> User (onet coin -> local coin)
          // TODO: onet
          throw new Error(
            "TransactionType.DEPOSIT transaction method not implemented.",
          );
          break;

        case TransactionType.WITHDRAWAL:
          // TODO: onet
          // Flow: User -> onet (local coin -> onet coin)
          throw new Error(
            "TransactionType.WITHDRAWAL transaction method not implemented.",
          );
          break;

        case TransactionType.TRANSFER: {
          // Flow: User -> User
          if (!fromAccount || !toAccount)
            throw new Error(
              "fromAccount and toAccount are required for transfer transactions.",
            );

          const [fromEntry, toEntry] = await Promise.all([
            getBalanceEntry("users", fromAccount),
            getBalanceEntry("users", toAccount),
          ]);

          validateBalance(fromEntry, amount);
          validateBalance(toEntry, 0);

          buildAtomicTransaction(atomic, fromEntry, toEntry, amount);
          break;
        }

        default:
          throw new Error("Unsupported transaction type");
      }

      const result = await atomic.commit();
      if (!result.ok) {
        throw new Error("Transaction failed: conditions were not met.");
      }

      const transactionId = ulid();
      const transactionData: Transaction = {
        id: transactionId,
        type,
        description,
        fromAccount: fromAccount || null,
        toAccount: toAccount || null,
        amount,
        timestamp: Date.now(),
        meta,
      };

      await System.db.set(["transactions", transactionId], transactionData);

      if (fromAccount) {
        await System.db.set(
          ["transactionsByUser", fromAccount, transactionId],
          {
            ...transactionData,
            amount: -amount,
          },
        );
      }

      if (toAccount) {
        await System.db.set(
          ["transactionsByUser", toAccount, transactionId],
          transactionData,
        );
      }

      return { success: true, transactionId };
    } catch (error) {
      console.error("Transaction error:", error.message);
      return { success: false, error: error.message };
    }
  };

  return {
    load,

    getHotelBalance,
    executeTransaction,
  };
};

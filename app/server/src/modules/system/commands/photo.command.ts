import { System } from "../main.ts";
import {
  Command,
  CommandRoles,
  PrivateRoomMutable,
} from "shared/types/main.ts";

export const photoCommand: Command = {
  command: "photo",
  usages: ["<x> <y> <absX> <absY> <scale>"],
  // usages: [],
  role: CommandRoles.OP,
  description: "command.photo.description",
  func: async ({ user, args }) => {
    const room = (await System.game.rooms.get(
      user.getRoom(),
    )) as PrivateRoomMutable;
    const position = {
      x: args[2],
      y: args[3],
    };
    System.phantom.capture({
      room: await room.getObjectWithUsers(),
      position,
      size: {
        width: 256,
        height: 256,
      },
    });
  },
};

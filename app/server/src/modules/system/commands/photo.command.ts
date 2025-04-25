import { System } from "../main.ts";
import {
  Command,
  CommandRoles,
  PrivateRoomMutable,
} from "shared/types/main.ts";

export const photoCommand: Command = {
  command: "photo",
  // usages: ["<x> <y> <zoom>"],
  usages: [],
  role: CommandRoles.OP,
  description: "command.photo.description",
  func: async ({ user, args }) => {
    const room = (await System.game.rooms.get(
      user.getRoom(),
    )) as PrivateRoomMutable;
    System.phantom.capture(await room.getObjectWithUsers());
  },
};

import { roomListRequest } from "./room-list.request.ts";
import { roomPutRequest, roomRequest } from "./room.request.ts";
import { onlineUsersRequest } from "./online-users.request.ts";
import { furnitureRequest } from "./furniture.request.ts";
import { catalogRequest } from "./catalog.request.ts";
import { phantomRequest } from "./phantom.request.ts";
import { economyRequest } from "./economy.request.ts";
import { captureRequest } from "./capture.request.ts";

import { RequestType, getPathRequestList } from "@oh/utils";

export const requestList: RequestType[] = getPathRequestList({
  requestList: [
    roomListRequest,
    roomRequest,
    roomPutRequest,

    onlineUsersRequest,
    catalogRequest,
    furnitureRequest,

    phantomRequest,
    captureRequest,

    economyRequest,
  ],
  pathname: "",
});

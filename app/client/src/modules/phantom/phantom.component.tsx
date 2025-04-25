import React, { useMemo } from "react";
import {
  CoreLoaderComponent,
  InitialLoaderComponent,
} from "modules/application";
import {
  AccountProvider,
  AssetsProvider,
  ConfigProvider,
  FurnitureProvider,
  ProxyProvider,
  TasksProvider,
} from "shared/hooks";
import { NesterComponent, PrivateRoomComponent } from "shared/components";
import { RoomPoint } from "shared/types";
import { CrossDirection } from "shared/enums";
import { ApplicationProvider } from "@openhotel/pixi-components";

const Test = () => {
  const layout = [
    "xxxxxx2222",
    "xxxxxx2222",
    "xxxxxx2222",
    "x111122222",
    "x111122222",
    "s111122222",
    "x111122222",
    "x22x2x2222",
    "x22x3x2222",
    "x2233xxxxx",
    "xxxx33333x",
    "x33333333x",
    "x33333333x",
    "x33333333x",
  ];

  return (
    <PrivateRoomComponent
      {...{
        type: "private",
        version: 1,
        id: "test",
        title: "Room 1",
        description: `Test`,
        layout: layout.map((line) =>
          line
            .split("")
            .map(
              (value) =>
                (parseInt(value) ? parseInt(value) : value) as RoomPoint,
            ),
        ),
        spawnPoint: { x: 0, z: 5, y: 0 },
        spawnDirection: CrossDirection.NORTH,
        furniture: [],
        maxUsers: 10,
        ownerId: "test",
        ownerUsername: "test",
        users: [],
      }}
      onPointerTile={console.log}
    />
  );
};

export const PhantomComponent = () => {
  const providers = useMemo(
    () => [
      ({ children }) => <ApplicationProvider scale={1} children={children} />,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      TasksProvider,
      InitialLoaderComponent,
      ConfigProvider,
      ProxyProvider,
      AccountProvider,
      AssetsProvider,
      CoreLoaderComponent,
      FurnitureProvider,
      Test,
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};

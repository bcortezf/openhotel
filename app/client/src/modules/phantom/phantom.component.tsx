import React, { useEffect, useMemo, useState } from "react";
import {
  CoreLoaderComponent,
  InitialLoaderComponent,
} from "modules/application";
import {
  AssetsProvider,
  ConfigProvider,
  FurnitureProvider,
  TasksProvider,
  useFurniture,
} from "shared/hooks";
import {
  CharacterComponent,
  FurnitureComponent,
  FurnitureFrameComponent,
  NesterComponent,
  PrivateRoomComponent,
  TextComponent,
} from "shared/components";
import { RoomFurnitureFrame } from "shared/types";
import {
  CharacterArmAction,
  CharacterBodyAction,
  FurnitureType,
} from "shared/enums";
import {
  ApplicationProvider,
  ContainerComponent,
} from "@openhotel/pixi-components";
import { getPositionFromIsometricPosition, getZIndex } from "shared/utils";

const Test = () => {
  const { load: loadFurniture, get: getFurniture } = useFurniture();

  const [room, setRoom] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("?");
    const interval = setInterval(() => {
      setRoom((room) => {
        if (room) clearInterval(interval);
        return room ?? JSON.parse(localStorage.getItem("room"));
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPosition({
      x: parseInt(params.get("posX") ?? "0"),
      y: parseInt(params.get("posY") ?? "0"),
    });
  }, [setPosition]);

  useEffect(() => {
    if (!room) return;
    loadFurniture(
      ...room.furniture.map((furniture) => furniture.furnitureId),
    ).then(() => {
      const meta = document.createElement("meta");
      meta.httpEquiv = "X-PHANTOM-LOADING-STATE";
      meta.content = "DONE";
      document.head.append(meta);
    });
  }, [room, loadFurniture]);

  const renderFurniture = useMemo(
    () =>
      room?.furniture?.map((furniture) =>
        furniture.type === FurnitureType.FURNITURE ? (
          <FurnitureComponent
            key={furniture.id}
            id={furniture.id}
            position={furniture.position}
            furnitureId={furniture.furnitureId}
            direction={furniture?.direction}
          />
        ) : (
          <FurnitureFrameComponent
            key={furniture.id}
            id={furniture.id}
            position={furniture.position}
            furnitureId={furniture.furnitureId}
            direction={furniture?.direction}
            framePosition={(furniture as RoomFurnitureFrame)?.framePosition}
          />
        ),
      ),
    [room?.furniture, getFurniture],
  );

  const renderCharacters = useMemo(
    () =>
      room?.users?.map((user) => (
        <CharacterComponent
          key={user.accountId}
          bodyAction={CharacterBodyAction.IDLE}
          bodyDirection={user.bodyDirection}
          headDirection={user.bodyDirection}
          leftArmAction={CharacterArmAction.IDLE}
          rightArmAction={CharacterArmAction.IDLE}
          skinColor={0xefcfb1}
          position={getPositionFromIsometricPosition(user.position)}
          zIndex={getZIndex(user.position)}
        />
      )),
    [room?.users],
  );

  if (!room) return;

  return (
    <ContainerComponent position={position}>
      <TextComponent text={localStorage.getItem("username") ?? "test"} />
      {/*@ts-ignore*/}
      <PrivateRoomComponent {...room}>
        {renderFurniture}
        {renderCharacters}
      </PrivateRoomComponent>
    </ContainerComponent>
  );
};

export const PhantomComponent = () => {
  const providers = useMemo(
    () => [
      ({ children }) => <ApplicationProvider scale={1} children={children} />,
      TasksProvider,
      InitialLoaderComponent,
      ConfigProvider,
      AssetsProvider,
      CoreLoaderComponent,
      FurnitureProvider,
      Test,
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};

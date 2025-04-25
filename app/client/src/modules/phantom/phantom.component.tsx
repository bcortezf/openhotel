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
import { ApplicationProvider } from "@openhotel/pixi-components";
import { getPositionFromIsometricPosition, getZIndex } from "shared/utils";

// const room = {
//   type: "private",
//   furniture: [
//     {
//       furnitureId: "alpha@mid-lamp",
//       type: 0,
//       id: "01JRZPVXJC11KA6TXT7MH9C2XA",
//       direction: 0,
//       position: { x: 1, y: 0, z: 0 },
//     },
//     {
//       furnitureId: "alpha@small-lamp",
//       type: 0,
//       id: "01JRZPVXJNVQBX4QE5BBYK1CE8",
//       direction: 0,
//       position: { x: 1, y: 0, z: 2 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JRZPVXJRG12RFQ7WEMH3TCGQ",
//       direction: 0,
//       position: { x: 1, y: 0, z: 4 },
//     },
//     {
//       furnitureId: "default@furniture",
//       type: 0,
//       id: "01JRZPVXJV7X683MWN54AY44EF",
//       direction: 0,
//       position: { x: 1, y: 0, z: 6 },
//     },
//     {
//       furnitureId: "teleports@telephone",
//       type: 0,
//       id: "01JRZPVXJYKNEXNZ6C05XZJVB5",
//       direction: 0,
//       position: { x: 1, y: 0, z: 8 },
//     },
//     {
//       furnitureId: "toys@octopus-0",
//       type: 0,
//       id: "01JRZPVXK1H94YJX9XVGWWP020",
//       direction: 0,
//       position: { x: 4, y: 0, z: 1 },
//     },
//     {
//       furnitureId: "xmas@tree-0",
//       type: 0,
//       id: "01JRZPVXK4F4SQ9X6B4NDRC6VK",
//       direction: 0,
//       position: { x: 4, y: 0, z: 3 },
//     },
//     {
//       furnitureId: "xmas@tree-1",
//       type: 0,
//       id: "01JRZPVXK71737YATQ6WCH38PK",
//       direction: 0,
//       position: { x: 4, y: 0, z: 5 },
//     },
//     {
//       furnitureId: "alpha@a-24",
//       type: 1,
//       id: "01JRZPVXKC3F1GE73E6B384HPD",
//       direction: 0,
//       position: { x: 1, y: 0, z: 1 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "alpha@p-24",
//       type: 1,
//       id: "01JRZPVXKFPP51C3GYD8XS1F2G",
//       direction: 0,
//       position: { x: 1, y: 35, z: 1 },
//       framePosition: { x: 1, y: 75 },
//     },
//     {
//       furnitureId: "default@frame",
//       type: 1,
//       id: "01JRZPVXKK8FE0MK3TWS3D85MQ",
//       direction: 0,
//       position: { x: 1, y: 0, z: 3 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "flags@country-spain",
//       type: 1,
//       id: "01JRZPVXKQ8SKJJ0Q3EHNQ86T5",
//       direction: 0,
//       position: { x: 1, y: 27, z: 3 },
//       framePosition: { x: 1, y: 75 },
//     },
//     {
//       furnitureId: "flags@europe",
//       type: 1,
//       id: "01JRZPVXKVYC6YPAP4GZHRYHQ2",
//       direction: 0,
//       position: { x: 1, y: 0, z: 5 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "flags@pirate",
//       type: 1,
//       id: "01JRZPVXKZ397GXZNZJHHGPXYZ",
//       direction: 0,
//       position: { x: 1, y: 27, z: 5 },
//       framePosition: { x: 1, y: 75 },
//     },
//     {
//       furnitureId: "flags@pride-aromanticism",
//       type: 1,
//       id: "01JRZPVXM3Q9P5HY0SEXAJMRMM",
//       direction: 0,
//       position: { x: 1, y: 0, z: 7 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "flags@pride-asexual",
//       type: 1,
//       id: "01JRZPVXM7P1GHJMCN9XBXWYN9",
//       direction: 0,
//       position: { x: 1, y: 27, z: 7 },
//       framePosition: { x: 1, y: 75 },
//     },
//     {
//       furnitureId: "flags@pride-bi",
//       type: 1,
//       id: "01JRZPVXMCVA6KY7MVNQSGH6DG",
//       direction: 0,
//       position: { x: 1, y: 0, z: 9 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "flags@pride-intersex",
//       type: 1,
//       id: "01JRZPVXMGRTMMVC6DNCD8SNVV",
//       direction: 0,
//       position: { x: 1, y: 27, z: 9 },
//       framePosition: { x: 1, y: 75 },
//     },
//     {
//       furnitureId: "flags@pride-lesbian",
//       type: 1,
//       id: "01JRZPVXMNM4J496JYPX4PCJ69",
//       direction: 1,
//       position: { x: 2, y: 0, z: 0 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "flags@pride-lgtb",
//       type: 1,
//       id: "01JRZPVXMSJBDVG3KZ3WZFJQND",
//       direction: 1,
//       position: { x: 2, y: 27, z: 0 },
//       framePosition: { x: 1, y: 75 },
//     },
//     {
//       furnitureId: "flags@pride-non-binary",
//       type: 1,
//       id: "01JRZPVXMX8GDBKJ57VD58FWZ9",
//       direction: 1,
//       position: { x: 4, y: 0, z: 0 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "flags@pride-pansexuality",
//       type: 1,
//       id: "01JRZPVXN1FEZR9BET9QEFE4V7",
//       direction: 1,
//       position: { x: 4, y: 27, z: 0 },
//       framePosition: { x: 1, y: 75 },
//     },
//     {
//       furnitureId: "flags@pride-trans",
//       type: 1,
//       id: "01JRZPVXN58EGVJJWZVY4VTA30",
//       direction: 1,
//       position: { x: 6, y: 0, z: 0 },
//       framePosition: { x: 1, y: 25 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7T3N1BPM7PK8481KWQFVM5",
//       direction: 0,
//       position: { x: 1, z: 4, y: 13 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "flags@pride-trans",
//       type: 1,
//       id: "01JS7T6APA4K1DGH5WADZHJ0AB",
//       direction: 1,
//       position: { x: 10, z: 0, y: 0 },
//       size: { width: 17, height: 27, depth: 0 },
//       framePosition: { x: 8, y: 55 },
//     },
//     {
//       furnitureId: "default@furniture",
//       type: 0,
//       id: "01JS7T7A6QN76VQK133QC44FXP",
//       direction: 0,
//       position: { x: 4, z: 8, y: 0 },
//       size: { width: 1, height: 26, depth: 1 },
//     },
//     {
//       furnitureId: "default@furniture",
//       type: 0,
//       id: "01JS7T8MNDT8RS9493HDNSHV2V",
//       direction: 0,
//       position: { x: 4, z: 8, y: 26 },
//       size: { width: 1, height: 26, depth: 1 },
//     },
//     {
//       furnitureId: "default@furniture",
//       type: 0,
//       id: "01JS7T8NDZNTQQZSG31Z6HC5FF",
//       direction: 0,
//       position: { x: 4, z: 8, y: 52 },
//       size: { width: 1, height: 26, depth: 1 },
//     },
//     {
//       furnitureId: "default@furniture",
//       type: 0,
//       id: "01JS7T8P44Y54CX2B6Q135HGVJ",
//       direction: 0,
//       position: { x: 4, z: 8, y: 78 },
//       size: { width: 1, height: 26, depth: 1 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7VBA80ATR0W73JCWGGGKDV",
//       direction: 0,
//       position: { x: 4, z: 8, y: 104 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7VVCYTAX92B9W87ZXW00XS",
//       direction: 0,
//       position: { x: 10, z: 4, y: 0 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7W1ZH4JTFWK14240GY6MRN",
//       direction: 0,
//       position: { x: 4, z: 8, y: 117 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7W21FP593M06PFETV31MV0",
//       direction: 0,
//       position: { x: 4, z: 8, y: 130 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7W247HTDP0RQ2PZN2DJMP0",
//       direction: 1,
//       position: { x: 5, z: 0, y: 0 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7W265N7R5WGN8VHY2BDMEV",
//       direction: 1,
//       position: { x: 5, z: 0, y: 13 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "cakes@chocolate-small",
//       type: 0,
//       id: "01JS7W288P5ZGA9T8X8MXB4TTC",
//       direction: 1,
//       position: { x: 5, z: 0, y: 26 },
//       size: { width: 0, height: 13, depth: 0 },
//     },
//     {
//       furnitureId: "flags@pride-non-binary",
//       type: 1,
//       id: "01JS7W2VFZ28K3YBFS57QHP890",
//       direction: 1,
//       position: { x: 7, z: 0, y: 0 },
//       size: { width: 17, height: 27, depth: 0 },
//       framePosition: { x: 9, y: 47 },
//     },
//     {
//       furnitureId: "flags@pride-non-binary",
//       type: 1,
//       id: "01JS7W32CB1P0T8EZCMK8A0GGB",
//       direction: 1,
//       position: { x: 7, z: 0, y: 27 },
//       size: { width: 17, height: 27, depth: 0 },
//       framePosition: { x: 10, y: 29 },
//     },
//     {
//       furnitureId: "flags@pride-non-binary",
//       type: 1,
//       id: "01JS7W3567TXTY9EQTP1Q06GA4",
//       direction: 1,
//       position: { x: 5, z: 0, y: 39 },
//       size: { width: 17, height: 27, depth: 0 },
//       framePosition: { x: 10, y: 28 },
//     },
//     {
//       furnitureId: "flags@pride-non-binary",
//       type: 1,
//       id: "01JS7W4F52EVN2BJBMAHPGHYX9",
//       direction: 0,
//       position: { x: 1, z: 3, y: 54 },
//       size: { width: 17, height: 27, depth: 0 },
//       framePosition: { x: 10, y: 48 },
//     },
//     {
//       furnitureId: "toys@octopus-0",
//       type: 0,
//       id: "01JS7WF6N1K3THCZ9XX41T3ZKN",
//       direction: 0,
//       position: { x: 4, z: 1, y: 12 },
//       size: { width: 1, height: 12, depth: 1 },
//     },
//     {
//       furnitureId: "toys@octopus-0",
//       type: 0,
//       id: "01JS7WF7W2SAGT60W5P1J6ZMTV",
//       direction: 0,
//       position: { x: 4, z: 1, y: 24 },
//       size: { width: 1, height: 12, depth: 1 },
//     },
//     {
//       furnitureId: "toys@octopus-0",
//       type: 0,
//       id: "01JS7WFB6RAVJTBVB9ZTNK2K53",
//       direction: 0,
//       position: { x: 4, z: 1, y: 36 },
//       size: { width: 1, height: 12, depth: 1 },
//     },
//     {
//       furnitureId: "flags@pirate",
//       type: 1,
//       id: "01JSMMJ0QCS0G2JE33D60DZ350",
//       direction: 1,
//       position: { x: 5, z: 0, y: 66 },
//       size: { width: 17, height: 27, depth: 0 },
//       framePosition: { x: 7, y: 69 },
//     },
//   ],
//   layout: [
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ["s", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   ],
//   spawnPoint: { x: 0, y: 0, z: 10 },
//   spawnDirection: 0,
//   maxUsers: 10,
//   users: [
//     {
//       accountId: "01JRFF67J3T67ES540AK37DFJA",
//       position: { x: 3, y: 0, z: 4 },
//       bodyDirection: 0,
//     },
//   ],
//   ownerUsername: null,
// };

const Test = () => {
  const { load: loadFurniture, get: getFurniture } = useFurniture();

  const [room, setRoom] = useState(null);

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
    <>
      <TextComponent text={localStorage.getItem("username") ?? "test"} />
      {/*@ts-ignore*/}
      <PrivateRoomComponent {...room}>
        {renderFurniture}
        {renderCharacters}
      </PrivateRoomComponent>
    </>
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

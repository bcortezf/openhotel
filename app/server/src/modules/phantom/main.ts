import { getChildWorker } from "worker_ionic";
import { WorkerProps } from "shared/types/worker.types.ts";
import { ConfigTypes } from "shared/types/config.types.ts";
import { Envs } from "shared/types/envs.types.ts";

import puppeteer from "puppeter";
import { install } from "puppeter-browser";
import { log } from "shared/utils/log.utils.ts";

const room = {
  type: "private",
  furniture: [
    {
      furnitureId: "alpha@mid-lamp",
      type: 0,
      id: "01JRZPVXJC11KA6TXT7MH9C2XA",
      direction: 0,
      position: { x: 1, y: 0, z: 0 },
    },
    {
      furnitureId: "alpha@small-lamp",
      type: 0,
      id: "01JRZPVXJNVQBX4QE5BBYK1CE8",
      direction: 0,
      position: { x: 1, y: 0, z: 2 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JRZPVXJRG12RFQ7WEMH3TCGQ",
      direction: 0,
      position: { x: 1, y: 0, z: 4 },
    },
    {
      furnitureId: "default@furniture",
      type: 0,
      id: "01JRZPVXJV7X683MWN54AY44EF",
      direction: 0,
      position: { x: 1, y: 0, z: 6 },
    },
    {
      furnitureId: "teleports@telephone",
      type: 0,
      id: "01JRZPVXJYKNEXNZ6C05XZJVB5",
      direction: 0,
      position: { x: 1, y: 0, z: 8 },
    },
    {
      furnitureId: "toys@octopus-0",
      type: 0,
      id: "01JRZPVXK1H94YJX9XVGWWP020",
      direction: 0,
      position: { x: 4, y: 0, z: 1 },
    },
    {
      furnitureId: "xmas@tree-0",
      type: 0,
      id: "01JRZPVXK4F4SQ9X6B4NDRC6VK",
      direction: 0,
      position: { x: 4, y: 0, z: 3 },
    },
    {
      furnitureId: "xmas@tree-1",
      type: 0,
      id: "01JRZPVXK71737YATQ6WCH38PK",
      direction: 0,
      position: { x: 4, y: 0, z: 5 },
    },
    {
      furnitureId: "alpha@a-24",
      type: 1,
      id: "01JRZPVXKC3F1GE73E6B384HPD",
      direction: 0,
      position: { x: 1, y: 0, z: 1 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "alpha@p-24",
      type: 1,
      id: "01JRZPVXKFPP51C3GYD8XS1F2G",
      direction: 0,
      position: { x: 1, y: 35, z: 1 },
      framePosition: { x: 1, y: 75 },
    },
    {
      furnitureId: "default@frame",
      type: 1,
      id: "01JRZPVXKK8FE0MK3TWS3D85MQ",
      direction: 0,
      position: { x: 1, y: 0, z: 3 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "flags@country-spain",
      type: 1,
      id: "01JRZPVXKQ8SKJJ0Q3EHNQ86T5",
      direction: 0,
      position: { x: 1, y: 27, z: 3 },
      framePosition: { x: 1, y: 75 },
    },
    {
      furnitureId: "flags@europe",
      type: 1,
      id: "01JRZPVXKVYC6YPAP4GZHRYHQ2",
      direction: 0,
      position: { x: 1, y: 0, z: 5 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "flags@pirate",
      type: 1,
      id: "01JRZPVXKZ397GXZNZJHHGPXYZ",
      direction: 0,
      position: { x: 1, y: 27, z: 5 },
      framePosition: { x: 1, y: 75 },
    },
    {
      furnitureId: "flags@pride-aromanticism",
      type: 1,
      id: "01JRZPVXM3Q9P5HY0SEXAJMRMM",
      direction: 0,
      position: { x: 1, y: 0, z: 7 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "flags@pride-asexual",
      type: 1,
      id: "01JRZPVXM7P1GHJMCN9XBXWYN9",
      direction: 0,
      position: { x: 1, y: 27, z: 7 },
      framePosition: { x: 1, y: 75 },
    },
    {
      furnitureId: "flags@pride-bi",
      type: 1,
      id: "01JRZPVXMCVA6KY7MVNQSGH6DG",
      direction: 0,
      position: { x: 1, y: 0, z: 9 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "flags@pride-intersex",
      type: 1,
      id: "01JRZPVXMGRTMMVC6DNCD8SNVV",
      direction: 0,
      position: { x: 1, y: 27, z: 9 },
      framePosition: { x: 1, y: 75 },
    },
    {
      furnitureId: "flags@pride-lesbian",
      type: 1,
      id: "01JRZPVXMNM4J496JYPX4PCJ69",
      direction: 1,
      position: { x: 2, y: 0, z: 0 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "flags@pride-lgtb",
      type: 1,
      id: "01JRZPVXMSJBDVG3KZ3WZFJQND",
      direction: 1,
      position: { x: 2, y: 27, z: 0 },
      framePosition: { x: 1, y: 75 },
    },
    {
      furnitureId: "flags@pride-non-binary",
      type: 1,
      id: "01JRZPVXMX8GDBKJ57VD58FWZ9",
      direction: 1,
      position: { x: 4, y: 0, z: 0 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "flags@pride-pansexuality",
      type: 1,
      id: "01JRZPVXN1FEZR9BET9QEFE4V7",
      direction: 1,
      position: { x: 4, y: 27, z: 0 },
      framePosition: { x: 1, y: 75 },
    },
    {
      furnitureId: "flags@pride-trans",
      type: 1,
      id: "01JRZPVXN58EGVJJWZVY4VTA30",
      direction: 1,
      position: { x: 6, y: 0, z: 0 },
      framePosition: { x: 1, y: 25 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7T3N1BPM7PK8481KWQFVM5",
      direction: 0,
      position: { x: 1, z: 4, y: 13 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "flags@pride-trans",
      type: 1,
      id: "01JS7T6APA4K1DGH5WADZHJ0AB",
      direction: 1,
      position: { x: 10, z: 0, y: 0 },
      size: { width: 17, height: 27, depth: 0 },
      framePosition: { x: 8, y: 55 },
    },
    {
      furnitureId: "default@furniture",
      type: 0,
      id: "01JS7T7A6QN76VQK133QC44FXP",
      direction: 0,
      position: { x: 4, z: 8, y: 0 },
      size: { width: 1, height: 26, depth: 1 },
    },
    {
      furnitureId: "default@furniture",
      type: 0,
      id: "01JS7T8MNDT8RS9493HDNSHV2V",
      direction: 0,
      position: { x: 4, z: 8, y: 26 },
      size: { width: 1, height: 26, depth: 1 },
    },
    {
      furnitureId: "default@furniture",
      type: 0,
      id: "01JS7T8NDZNTQQZSG31Z6HC5FF",
      direction: 0,
      position: { x: 4, z: 8, y: 52 },
      size: { width: 1, height: 26, depth: 1 },
    },
    {
      furnitureId: "default@furniture",
      type: 0,
      id: "01JS7T8P44Y54CX2B6Q135HGVJ",
      direction: 0,
      position: { x: 4, z: 8, y: 78 },
      size: { width: 1, height: 26, depth: 1 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7VBA80ATR0W73JCWGGGKDV",
      direction: 0,
      position: { x: 4, z: 8, y: 104 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7VVCYTAX92B9W87ZXW00XS",
      direction: 0,
      position: { x: 10, z: 4, y: 0 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7W1ZH4JTFWK14240GY6MRN",
      direction: 0,
      position: { x: 4, z: 8, y: 117 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7W21FP593M06PFETV31MV0",
      direction: 0,
      position: { x: 4, z: 8, y: 130 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7W247HTDP0RQ2PZN2DJMP0",
      direction: 1,
      position: { x: 5, z: 0, y: 0 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7W265N7R5WGN8VHY2BDMEV",
      direction: 1,
      position: { x: 5, z: 0, y: 13 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "cakes@chocolate-small",
      type: 0,
      id: "01JS7W288P5ZGA9T8X8MXB4TTC",
      direction: 1,
      position: { x: 5, z: 0, y: 26 },
      size: { width: 0, height: 13, depth: 0 },
    },
    {
      furnitureId: "flags@pride-non-binary",
      type: 1,
      id: "01JS7W2VFZ28K3YBFS57QHP890",
      direction: 1,
      position: { x: 7, z: 0, y: 0 },
      size: { width: 17, height: 27, depth: 0 },
      framePosition: { x: 9, y: 47 },
    },
    {
      furnitureId: "flags@pride-non-binary",
      type: 1,
      id: "01JS7W32CB1P0T8EZCMK8A0GGB",
      direction: 1,
      position: { x: 7, z: 0, y: 27 },
      size: { width: 17, height: 27, depth: 0 },
      framePosition: { x: 10, y: 29 },
    },
    {
      furnitureId: "flags@pride-non-binary",
      type: 1,
      id: "01JS7W3567TXTY9EQTP1Q06GA4",
      direction: 1,
      position: { x: 5, z: 0, y: 39 },
      size: { width: 17, height: 27, depth: 0 },
      framePosition: { x: 10, y: 28 },
    },
    {
      furnitureId: "flags@pride-non-binary",
      type: 1,
      id: "01JS7W4F52EVN2BJBMAHPGHYX9",
      direction: 0,
      position: { x: 1, z: 3, y: 54 },
      size: { width: 17, height: 27, depth: 0 },
      framePosition: { x: 10, y: 48 },
    },
    {
      furnitureId: "toys@octopus-0",
      type: 0,
      id: "01JS7WF6N1K3THCZ9XX41T3ZKN",
      direction: 0,
      position: { x: 4, z: 1, y: 12 },
      size: { width: 1, height: 12, depth: 1 },
    },
    {
      furnitureId: "toys@octopus-0",
      type: 0,
      id: "01JS7WF7W2SAGT60W5P1J6ZMTV",
      direction: 0,
      position: { x: 4, z: 1, y: 24 },
      size: { width: 1, height: 12, depth: 1 },
    },
    {
      furnitureId: "toys@octopus-0",
      type: 0,
      id: "01JS7WFB6RAVJTBVB9ZTNK2K53",
      direction: 0,
      position: { x: 4, z: 1, y: 36 },
      size: { width: 1, height: 12, depth: 1 },
    },
    {
      furnitureId: "flags@pirate",
      type: 1,
      id: "01JSMMJ0QCS0G2JE33D60DZ350",
      direction: 1,
      position: { x: 5, z: 0, y: 66 },
      size: { width: 17, height: 27, depth: 0 },
      framePosition: { x: 7, y: 69 },
    },
  ],
  layout: [
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["x", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ["s", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  spawnPoint: { x: 0, y: 0, z: 10 },
  spawnDirection: 0,
  maxUsers: 10,
  users: [
    {
      accountId: "01JRFF67J3T67ES540AK37DFJA",
      position: { x: 3, y: 0, z: 4 },
      bodyDirection: 0,
    },
  ],
  ownerUsername: null,
};

(() => {
  const serverWorker = getChildWorker();

  let $config: ConfigTypes;
  let $envs: Envs;
  let executablePath: string = "";
  let browser;

  const load = async ({ envs, config }: WorkerProps) => {
    $config = config;
    $envs = envs;

    const browserName = `${config.phantom.browser.name}@${config.phantom.browser.buildId}`;

    log(`Installing ${browserName}...`);
    await install({
      cacheDir: Deno.cwd(),
      browser: config.phantom.browser.name,
      buildId: config.phantom.browser.buildId,
    });
    log(`${browserName} installed!`);

    for await (const dirEntry of Deno.readDir("chrome")) {
      if (dirEntry.isFile) continue;

      for await (const dirEntry1 of Deno.readDir("chrome/" + dirEntry.name)) {
        if (dirEntry1.isFile) continue;
        executablePath = "chrome/" + dirEntry.name + "/" + dirEntry1.name;
      }
    }
    switch (Deno.build.os) {
      case "linux":
        executablePath += "/chrome";
        break;
      case "darwin":
        executablePath +=
          "/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
        break;
      case "windows":
        executablePath += "/chrome.exe";
        break;
    }

    browser = await puppeteer.launch({
      executablePath,
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
        "--no-zygote",
        "--enable-unsafe-swiftshader",
      ],
    });
  };

  const capturePrivateRoom = async ({ id, room, position, size }) => {
    const page = await browser.newPage();
    await page.setViewport({ width: size.width, height: size.height });
    await page.setRequestInterception(true);

    page.on("console", (msg) => {
      console.log("PAGE LOG:", msg.text());
    });
    page.on("pageerror", (err) => {
      console.error("PAGE ERROR:", err);
    });

    page.on("request", async (req) => {
      // console.log(req.url());
      await req.continue();
    });

    const url = new URL("http://localhost:1994/phantom");
    url.searchParams.append("posX", position.x);
    url.searchParams.append("posY", position.y);

    await page.goto(url.href, {});

    await page.evaluate((data) => {
      localStorage.setItem("room", JSON.stringify(data));
    }, room);
    await page.waitForSelector("canvas");

    await page.waitForFunction(() => {
      const meta = document.querySelector(
        'meta[http-equiv="X-PHANTOM-LOADING-STATE"]',
      );
      return meta && meta.content === "DONE";
    });

    const canvas = await page.$("canvas");
    if (canvas) {
      const screenshotName = `screenshot-${Date.now()}.png`;
      await canvas.screenshot({ path: screenshotName });
      console.log(`Screenshot ${screenshotName} taken`);
    } else {
      console.error("canvas not found");
    }
    page.close();
  };

  serverWorker.on("start", load);

  serverWorker.on("capture-private-room", capturePrivateRoom);
})();

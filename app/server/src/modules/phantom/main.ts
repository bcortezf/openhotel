import { getChildWorker } from "worker_ionic";
import { WorkerProps } from "shared/types/worker.types.ts";
import { ConfigTypes } from "shared/types/config.types.ts";
import { Envs } from "shared/types/envs.types.ts";

import puppeteer from "puppeter";
import { install } from "puppeter-browser";
import { log } from "shared/utils/log.utils.ts";

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

    await new Promise((r) => setTimeout(r, 5000));

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
      ],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 256, height: 256 });
    await page.setRequestInterception(true);

    page.on("request", async (req) => {
      console.log(req.url());
      await req.continue();
    });

    await page.goto(
      "http://localhost:1994/phantom?roomId=01JRZPVM0KF806NRNWK3QASTF7",
      {},
    );
    await page.waitForSelector("canvas");

    await new Promise((r) => setTimeout(r, 5000));

    const canvas = await page.$("canvas");
    if (canvas) {
      const screenshotName = `screenshot-${Date.now()}.png`;
      await canvas.screenshot({ path: screenshotName });
      console.log(`Screenshot ${screenshotName} taken`);
    } else {
      console.error("canvas not found");
    }
  };

  serverWorker.on("start", load);
})();

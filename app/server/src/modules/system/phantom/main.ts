import { WorkerParent, getParentWorker } from "worker_ionic";
import { WorkerProps } from "shared/types/main.ts";
import { System } from "modules/system/main.ts";

export const phantom = () => {
  let $worker: WorkerParent;

  const load = () => {
    const config = System.config.get();
    const envs = System.getEnvs();

    $worker = getParentWorker({
      url: new URL("../../phantom/main.ts", import.meta.url).href,
    });
    $worker.emit("start", {
      config,
      envs,
    } as WorkerProps);
  };

  const capture = ({ room, position, size }) => {
    $worker.emit("capture-private-room", {
      room,
      position,
      size,
    });
  };

  return {
    load,
    capture,
  };
};

import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "glitch-image",
  taskQueue: "async",
  outputTargets: [
    {
      type: "dist",
    },
    {
      type: "docs-readme",
    },
  ],
};

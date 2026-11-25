/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
// Local Chromium headless shell (Remotion's auto-download can't reach the
// internet through this VM's egress proxy — Node ignores proxy env vars).
// Downloaded once via curl + proxy on 2026-10-15; keep it, never re-download.
Config.setChromiumOpenGlRenderer("swangle");
Config.setBrowserExecutable(
  "/home/hatch/workspace/remotion/browser/chrome-headless-shell-linux64/chrome-headless-shell"
);

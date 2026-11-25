import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { BridgeShort, BRIDGE_FRAMES } from "./videos/bridge/Bridge";
import { ShipsShort, SHIPS_FRAMES } from "./videos/ships/Ships";
import { TestBox } from "./videos/testbox/TestBox";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="TestBox"
        component={TestBox}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BridgeShort"
        component={BridgeShort}
        durationInFrames={BRIDGE_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ShipsShort"
        component={ShipsShort}
        durationInFrames={SHIPS_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

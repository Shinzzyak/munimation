import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { JailbreakPromo } from "./JailbreakPromo";
import { JailbreakPromoV2 } from "./JailbreakPromoV2";
import { EnginePromo } from "./EnginePromo";
import { EngineJailbreak } from "./EngineJailbreak";
import { EngineJailbreakV4 } from "./EngineJailbreakV4";
import { EngineJailbreakV5 } from "./EngineJailbreakV5";
import { PotatoPromo } from "./PotatoPromo";
import { CompactionPromo } from "./CompactionPromo";
import { JailbreakWeekly } from "./JailbreakWeekly";
import { EngineIsometric } from "./EngineIsometric";
import { EngineIsometricV2 } from "./EngineIsometricV2";
import { KodokTest } from "./KodokTest";
import { EngineWeekly20261101 } from "./EngineWeekly20261101";
import { PotatoWeekly20261108 } from "./PotatoWeekly20261108";
import { CompactionWeekly20261115 } from "./CompactionWeekly20261115";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="JailbreakPromo"
        component={JailbreakPromo}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="JailbreakPromoV2"
        component={JailbreakPromoV2}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EnginePromo"
        component={EnginePromo}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EngineJailbreak"
        component={EngineJailbreak}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EngineJailbreakV4"
        component={EngineJailbreakV4}
        durationInFrames={810}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EngineJailbreakV5"
        component={EngineJailbreakV5}
        durationInFrames={1620}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PotatoPromo"
        component={PotatoPromo}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CompactionPromo"
        component={CompactionPromo}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="JailbreakWeekly"
        component={JailbreakWeekly}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EngineIsometric"
        component={EngineIsometric}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EngineIsometricV2"
        component={EngineIsometricV2}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KodokTest"
        component={KodokTest}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EngineWeekly20261101"
        component={EngineWeekly20261101}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PotatoWeekly20261108"
        component={PotatoWeekly20261108}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CompactionWeekly20261115"
        component={CompactionWeekly20261115}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

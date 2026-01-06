import { BACKEND_URL } from "@/config/app.config";
import { FeaturesArr } from "@/featuresArr";
import { LinkEncrypter } from "@/services/linkEncrypter.service";
import { LinkExpirer } from "@/services/linkExpirer.service";
import { LinkShortner } from "@/services/linkShortner.service";
import {
  useCurrentFeatureStore,
  useCurrentUrlStore,
  useExtraInputFields,
} from "@/zustand/store";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import LinkEncrypterComp from "./LinkEncrypterComp";
import LinkExpirerComp from "./LinkExpirerComp";
import LinkShortnerComp from "./LinkShortnerComp";
import LinkToQR from "./LinkToQRComp";
import { Button } from "./ui/button";
import { Card, CardDescription, CardTitle } from "./ui/card";
const HomeBottom = () => {
  const index = useCurrentFeatureStore((state) => state.index);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.4,
        duration: 0.5,
        ease: "easeOut",
      }}
      className="w-full flex justify-center items-center mt-10"
    >
      <Card className="w-full border border-border sm:p-10 p-8 sm:max-w-5xl sm:h-[450px] h-[480px] justify-between bg-card/60 backdrop-blur-lg">
        <div>
          <CardTitle className="text-xl font-bold mb-2">
            {FeaturesArr[index].title.toUpperCase()}
          </CardTitle>
          <CardDescription className="text-sm">
            {FeaturesArr[index].description}
          </CardDescription>
        </div>

        <Features />
        <FeatureCardsBtns />
      </Card>
    </motion.div>
  );
};

const FeatureCardsBtns = () => {
  const currentInputUrl = useCurrentUrlStore((state) => state.currentInputUrl);
  const setCurrentResultUrl = useCurrentUrlStore(
    (state) => state.setCurrentResultUrl
  );
  const index = useCurrentFeatureStore((state) => state.index);
  const password = useExtraInputFields((state) => state.password);
  const dateAndTime = useExtraInputFields((state) => state.dateAndTime);
  const setIndex = useCurrentFeatureStore((state) => state.setIndex);
  const setRenderer = useExtraInputFields((state) => state.setRenderer);

  const [visibility, setVisibility] = useState<string>("block");

  const actions: Record<number, () => Promise<void> | void> = {
    0: async () => {
      const res = await new LinkShortner().shorten({
        link: currentInputUrl,
      });
      setCurrentResultUrl(
        res.success
          ? { type: "success", url: `${BACKEND_URL}` + res.data.shortenedLink }
          : { type: "error", errorMessage: res.error.message }
      );
    },

    1: async () => {
      const res = await new LinkEncrypter().encrypt({
        link: currentInputUrl,
        password,
      });
      setCurrentResultUrl(
        res.success
          ? { type: "success", url: `${BACKEND_URL}` + res.data.encryptedLink }
          : { type: "error", errorMessage: res.error.message }
      );
    },

    2: async () => {
      const res = await new LinkExpirer().expirer({
        link: currentInputUrl,
        dateAndTime: dateAndTime as Date,
      });
      setCurrentResultUrl(
        res.success
          ? { type: "success", url: `${BACKEND_URL}` + res.data.expirerLink }
          : { type: "error", errorMessage: res.error.message }
      );
    },

    3: () => {
      setRenderer(true);
      setVisibility("hidden");
    },
  };

  const handleOnClickSubmitBtn = async () => {
    if (!currentInputUrl) return;

    const action = actions[index];
    if (!action) {
      console.warn("Unknown index:", index);
      return;
    }

    await action();
  };

  enum NavigationBtns {
    "next",
    "previous",
  }

  const handleOnClickNavigatinBtn = (selectedBtn: NavigationBtns) => {
    if (selectedBtn === NavigationBtns.next) {
      index === 3 ? setIndex(0) : setIndex(index + 1);
    } else {
      index === 0 ? setIndex(3) : setIndex(index - 1);
    }
    setVisibility("block");
    setRenderer(false);
  };

  return (
    <div className="flex flex-col">
      <Button
        className={`w-full font-bold mb-4 ${visibility} cursor-pointer`}
        onClick={handleOnClickSubmitBtn}
      >
        {FeaturesArr[index].title.toUpperCase()}
      </Button>
      <div className="flex sm:gap-5 flex-row">
        <Button
          variant={"outline"}
          className="w-1/2 cursor-pointer h-10 cursor-pointer"
          onClick={() => handleOnClickNavigatinBtn(NavigationBtns.previous)}
        >
          <span>
            <ChevronLeftIcon />
          </span>
          Previous
        </Button>
        <Button
          variant={"outline"}
          className="w-1/2 cursor-pointer h-10 cursor-pointer"
          onClick={() => handleOnClickNavigatinBtn(NavigationBtns.next)}
        >
          Next{" "}
          <span>
            <ChevronRightIcon />
          </span>
        </Button>
      </div>
    </div>
  );
};

const Features = () => {
  const feature = useCurrentFeatureStore((state) => state.index);
  if (feature === 0) {
    return <LinkShortnerComp />;
  } else if (feature === 1) {
    return <LinkEncrypterComp />;
  } else if (feature === 2) {
    return <LinkExpirerComp />;
  } else if (feature === 3) {
    return <LinkToQR />;
  }
};
export default HomeBottom;

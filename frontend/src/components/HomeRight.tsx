import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  useCurrentFeatureStore,
  useCurrentInputUrlStore,
} from "@/zustand/store";
import { FeaturesArr } from "@/featuresArr";
import LinkShortnerComp from "../components/LinkShortner";
import LinkEncrypterComp from "./LinkEncrypter";
import LinkExpirerComp from "./LinkExpirer";
import { ToastContainer } from "react-toastify";
import { LinkShortner, ShortenResponse } from "@/services/linkShortner.service";
import { copyToClipboard } from "@/services/copyToClipboard";
import LinkToQR from "./LinkToQR";
import {
  EncrypterResponse,
  LinkEncrypter,
} from "@/services/linkEncrypter.service";
import { ExpirerResponse, LinkExpirer } from "@/services/linkExpirer.service";
const HomeRight = () => {
  const index = useCurrentFeatureStore((state) => state.index);

  return (
    <div className="w-full h-full flex justify-center sm:h-32">
      <Card className="w-full h-full justify-between border border-border sm:p-10 p-8 sm:max-w-5xl sm:min-h-[420px]">
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
    </div>
  );
};

const FeatureCardsBtns = () => {
  const currentInputUrl = useCurrentInputUrlStore(
    (state) => state.currentInputUrl
  );
  const index = useCurrentFeatureStore((state) => state.index);
  const setIndex = useCurrentFeatureStore((state) => state.setIndex);
  const handleOnClickSubmitBtn = async () => {
    if (!currentInputUrl) return;

    let res: string | null;

    switch (index) {
      case 0: {
        const linkShortner = new LinkShortner(currentInputUrl);
        res = await linkShortner.shorten();
        break;
      }

      case 1: {
        const linkEncrypter = new LinkEncrypter(currentInputUrl);
        res = await linkEncrypter.encrypt();
        break;
      }

      case 2: {
        const linkExpirer = new LinkExpirer(currentInputUrl);
        res = await linkExpirer.expirer();
        break;
      }

      default:
        console.warn("Unknown index:", index);
    }
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
  };

  return (
    <div className="flex flex-col">
      <Button
        className="w-full font-bold mb-4"
        onClick={handleOnClickSubmitBtn}
      >
        {FeaturesArr[index].title.toUpperCase()}
      </Button>
      <ToastContainer />
      <div className="flex sm:gap-5 flex-row">
        <Button
          variant={"outline"}
          className="w-1/2 cursor-pointer h-10"
          onClick={() => handleOnClickNavigatinBtn(NavigationBtns.previous)}
        >
          <span>
            <ChevronLeftIcon />
          </span>
          Previous
        </Button>
        <Button
          variant={"outline"}
          className="w-1/2 cursor-pointer h-10"
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
export default HomeRight;

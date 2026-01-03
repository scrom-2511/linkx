import LinkShortner from "../components/LinkShortner";
import LinkEncrypter from "./LinkEncrypter";
import LinkToQR from "./LinkToQR";
import LinkExpirer from "./LinkExpirer";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCurrentFeatureStore } from "@/zustand/store";
const HomeRight = () => {
  const index = useCurrentFeatureStore((state) => state.index);
  const setIndex = useCurrentFeatureStore((state) => state.setIndex);

  const FeaturesArr = [
    {
      title: "Shorten Url",
      description: "Enter your url to shorten it",
    },
    {
      title: "Encrypt Url",
      description: "Enter your url to encrypt it",
    },
    {
      title: "Expire Url",
      description: "Enter your url to set an expiry date-time to it",
    },
    {
      title: "Qr Code Generator",
      description: "Enter your url to and generate a qr code from it",
    },
  ];

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

  const handleOnClickSubmitBtn = () => {
    if (index === 0) {
    } else if (index === 1) {
    }
  };

  return (
    <div className="w-full h-full flex justify-center sm:h-32">
      <Card className="w-full h-full justify-between border border-border sm:p-10 p-8 sm:max-w-5xl sm:min-h-[420px]">
        <div>
          <CardTitle className="text-xl font-bold mb-2">
            {FeaturesArr[index].title.toUpperCase()}
          </CardTitle>
          <CardDescription className="text-sm">{FeaturesArr[index].description}</CardDescription>
        </div>
        <Features />
        <div className="flex flex-col gap-3">
          <Button className="w-full font-bold">{FeaturesArr[index].title.toUpperCase()}</Button>
          <div className="flex sm:gap-5 flex-row ">
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
      </Card>
    </div>
  );
};

const Features = () => {
  const feature = useCurrentFeatureStore((state) => state.index);
  if (feature === 0) {
    return <LinkShortner />;
  } else if (feature === 1) {
    return <LinkEncrypter />;
  } else if (feature === 2) {
    return <LinkExpirer />;
  } else if (feature === 3) {
    return <LinkToQR />;
  }
};
export default HomeRight;

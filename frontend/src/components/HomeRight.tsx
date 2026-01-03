import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import LinkShortner from "../components/LinkShortner";
import LinkEncrypter from "./LinkEncrypter";
import LinkToQR from "./LinkToQR";
import LinkExpirer from "./LinkExpirer";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
const HomeRight = () => {
  return (
    <div className="w-full h-full flex justify-center sm:h-32">
      <Card className="w-full h-full justify-between border border-border sm:p-10 p-8 sm:max-w-5xl sm:min-h-[420px]">
        <div>
          <CardTitle className="text-xl">SHORT URL</CardTitle>
          <CardDescription className="text-sm">
            Enter the URL which you want to shorten.
          </CardDescription>
        </div>
        <LinkEncrypter />
        <Button className="w-full">SHORTEN URL</Button>
        <div className="flex sm:gap-5">
          <Button variant={"outline"} className="w-1/2 cursor-pointer"><span><ChevronLeftIcon/></span>Previous</Button>
          <Button variant={"outline"} className="w-1/2 cursor-pointer">Next <span><ChevronRightIcon/></span></Button>
        </div>
      </Card>
    </div>
  );
};

const Features = () => {
  const feature = useSelector((state: RootState) => state.feature.value);

  if (feature === 1) {
    return <LinkShortner />;
  } else if (feature === 2) {
    return <LinkEncrypter />;
  } else if (feature === 3) {
    return <LinkExpirer />;
  } else if (feature === 4) {
    return <LinkToQR />;
  }
};
export default HomeRight;

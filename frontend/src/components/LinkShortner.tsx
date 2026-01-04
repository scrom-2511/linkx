import { useRef } from "react";
import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { FeaturesArr } from "@/featuresArr";
import { useCurrentFeatureStore } from "@/zustand/store";
import { LinkShortner } from "@/services/linkShortner.service";
import { copyToClipboard } from "@/services/copyToClipboard";
import { ToastContainer, toast } from "react-toastify";
const LinkShortnerComp = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useCurrentFeatureStore((state) => state.index);
  const handleOnClickSubmitBtn = async () => {
    if (inputRef.current?.value) {
      const somthing = new LinkShortner(inputRef.current?.value);
      const res = await somthing.shorten();
    }
  };

  const notify = () => toast("Copied To Clipboard", { theme: "dark" });

  let textToCopy = "hi there";
  return (
    <>
      <div className="flex flex-col gap-5">
        <Input
          type="url"
          placeholder="Enter the url"
          className="border text-sm placeholder:font-light sm:h-10"
          ref={inputRef}
        />
        <Item
          variant="outline"
          size="sm"
          className="px-3 py-1 border sm:h-10"
          asChild
          onClick={async () => {
            await copyToClipboard(textToCopy);
            notify();
          }}
        >
          <a>
            <ItemContent>
              <ItemTitle className="text-sm text-muted-foreground font-light">
                You will get the shortend url here.
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <Copy size={12} />
            </ItemActions>
          </a>
        </Item>
      </div>
      <Button className="w-full font-bold" onClick={handleOnClickSubmitBtn}>
        {FeaturesArr[index].title.toUpperCase()}
      </Button>
      <ToastContainer />
    </>
  );
};

export default LinkShortnerComp;

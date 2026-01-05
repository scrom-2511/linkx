import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
import { useCurrentUrlStore } from "@/zustand/store";
import { copyToClipboard } from "@/services/copyToClipboard";
import { toast } from "react-toastify";
import { useEffect } from "react";
const LinkShortnerComp = () => {
  const textToCopy = useCurrentUrlStore((state) => state.currentResultUrl);
  const setInput = useCurrentUrlStore((state) => state.setCurrentInputUrl);
  
  const notify = () => toast("Copied To Clipboard", { theme: "dark" });
  
  const setCurrentResultUrl = useCurrentUrlStore(
  (state) => state.setCurrentResultUrl
  );
  useEffect(() => {
    setCurrentResultUrl("You will get the shortened link here.")
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Input
        type="url"
        placeholder="Enter the url"
        className="border text-sm placeholder:font-light sm:h-10"
        onChange={(e) => setInput(e.target.value)}
      />
      <Item
        variant="outline"
        size="sm"
        className="px-3 py-1 border sm:h-10 cursor-pointer"
        asChild
        onClick={async () => {
          await copyToClipboard(textToCopy);
          notify();
        }}
      >
        <div>
          <ItemContent>
            <ItemTitle className="text-sm text-muted-foreground font-light">
              {textToCopy}
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <Copy size={12} />
          </ItemActions>
        </div>
      </Item>
    </div>
  );
};

export default LinkShortnerComp;

import { useCurrentUrlStore, useExtraInputFields } from "@/zustand/store";
import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
import { copyToClipboard } from "@/services/copyToClipboard";
import { useEffect } from "react";
const LinkEncrypterComp = () => {
  const textToCopy = useCurrentUrlStore((state) => state.currentResultUrl);
  const setPassword = useExtraInputFields((state) => state.setPassword);
  const setInput = useCurrentUrlStore((state) => state.setCurrentInputUrl);

  const notify = () => toast("Copied To Clipboard", { theme: "dark" });

  const setCurrentResultUrl = useCurrentUrlStore(
    (state) => state.setCurrentResultUrl
  );
  useEffect(() => {
    setCurrentResultUrl("You will get the encrypted link here.");
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <Input
          type="url"
          placeholder="Enter the url"
          className="text-sm placeholder:font-light sm:h-10 hover:bg-accent/50 border"
          onChange={(e) => setInput(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter the password"
          className="text-sm placeholder:font-light sm:h-10 hover:bg-accent/50 border"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Item
          variant="outline"
          size="sm"
          className="px-3 py-1 sm:h-10 hover:bg-accent/50 border"
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
    </>
  );
};

export default LinkEncrypterComp;

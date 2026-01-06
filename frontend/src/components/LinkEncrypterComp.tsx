import { copyToClipboard } from "@/services/copyToClipboard";
import { useCurrentUrlStore, useExtraInputFields } from "@/zustand/store";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
const LinkEncrypterComp = () => {
  const currentResultUrl = useCurrentUrlStore(
    (state) => state.currentResultUrl
  );
  const setPassword = useExtraInputFields((state) => state.setPassword);
  const setInput = useCurrentUrlStore((state) => state.setCurrentInputUrl);

  const notify = () => toast("Copied To Clipboard", { theme: "dark" });

  const setCurrentResultUrl = useCurrentUrlStore(
    (state) => state.setCurrentResultUrl
  );
  useEffect(() => {
    setCurrentResultUrl({
      type: "info",
      message: "You will get the encrypted url over here.",
    });
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
            await copyToClipboard(
              currentResultUrl.type === "success" ? currentResultUrl.url : ""
            );
            notify();
          }}
        >
          <div>
            <ItemContent>
              <ItemTitle
                className={`text-sm font-light ${
                  currentResultUrl.type === "success"
                    ? "text-white"
                    : currentResultUrl.type === "info"
                    ? "text-muted-foreground"
                    : "text-destructive"
                }`}
              >
                {currentResultUrl.type === "success"
                  ? currentResultUrl.url
                  : currentResultUrl.type === "error"
                  ? currentResultUrl.errorMessage
                  : currentResultUrl.message}
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

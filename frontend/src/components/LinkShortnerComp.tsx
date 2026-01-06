import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
import { useCurrentUrlStore } from "@/zustand/store";
import { copyToClipboard } from "@/services/copyToClipboard";
import { toast } from "react-toastify";
import { useEffect } from "react";
const LinkShortnerComp = () => {
  const currentResultUrl = useCurrentUrlStore(
    (state) => state.currentResultUrl
  );
  const setInput = useCurrentUrlStore((state) => state.setCurrentInputUrl);

  const notify = () => toast("Copied To Clipboard", { theme: "dark" });

  const setCurrentResultUrl = useCurrentUrlStore(
    (state) => state.setCurrentResultUrl
  );
  useEffect(() => {
    setCurrentResultUrl({
      type: "info",
      message: "You will get the shortened url over here.",
    });
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
                  ? ""
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
  );
};

export default LinkShortnerComp;

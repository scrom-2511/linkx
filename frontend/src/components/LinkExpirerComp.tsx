import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
import { DateTimePicker24h } from "./DateTimePicker";
import { toast } from "react-toastify";
import { useCurrentUrlStore } from "@/zustand/store";
import { copyToClipboard } from "@/services/copyToClipboard";
import { useEffect } from "react";
const LinkExpirerComp = () => {
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
      message: "You will get the expired url over here.",
    });
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Input
        type="url"
        placeholder="Enter the url"
        className="text-sm placeholder:font-light sm:h-10 hover:bg-accent/50 border"
        onChange={(e) => setInput(e.target.value)}
      />
      <DateTimePicker24h />
      <Item
        variant="outline"
        size="sm"
        className="px-3 py-1 border sm:h-10"
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
            <ItemTitle className={`text-sm font-light ${
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
  );
};

export default LinkExpirerComp;

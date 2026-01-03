import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
import { DateTimePicker24h } from "./DateTimePicker";
const LinkExpirer = () => {
  const [input, setInput] = useState<string>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const submitDataAndGetUrl = async () => {
    try {
      console.log("s")
      const dateAndTime = new Date(date + " " + time).toISOString();
      const response = await axios.post(
        "http://localhost:3000/linkCustomizer",
        {
          link: input,
          dateAndTime,
          encrypted: false,
        }
      );
      console.log(response)
      if (response.data.customLink) {
        setPlaceholder("http://localhost:3000/" + response.data.customLink);
      }
    } catch (error) {
      setPlaceholder("There was some problem at our end.");
      console.log(error);
    }
  };
  useEffect(() => {
    if (placeholder === "Copied!") {
      setTimeout(() => {
        setPlaceholder("");
      }, 3000);
    }
  }, [placeholder]);

  return (
    <div className="flex flex-col gap-5">
      <Input
        type="url"
        placeholder="Enter the url"
        className="text-sm placeholder:font-light sm:h-10 hover:bg-accent/50 border"
      />
      <DateTimePicker24h/>
      <Item
        variant="outline"
        size="sm"
        className="px-3 py-1 border sm:h-10"
        asChild
      >
        <a href="#">
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
  );
};

export default LinkExpirer;

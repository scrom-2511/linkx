import axios from "axios";
import NavigationButton from "./NavigationButton";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
const LinkEncrypter = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const submitDataAndGetUrl = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/linkCustomizer",
        {
          link: input,
          password,
          encrypted: true,
        }
      );
      if (response.data.customLink) {
        setPlaceholder("http://localhost:3000/" + response.data.customLink);
      }
    } catch (error) {
      setPlaceholder("There was some problem at our end.");
      console.log(error);
    }
  };
  useEffect(() => {
    if(placeholder === "Copied!"){
      setTimeout(() => {
        setPlaceholder("");
      }, 1000);
    }
  }, [placeholder]);

  return (
    <div className="flex flex-col gap-5">
      <Input
        type="url"
        placeholder="Enter the url"
        className="text-sm placeholder:font-light sm:h-10 hover:bg-accent/50 border"
      />
      <Input
        type="password"
        placeholder="Enter the password"
        className="text-sm placeholder:font-light sm:h-10 hover:bg-accent/50 border"
      />
      <Item
        variant="outline"
        size="sm"
        className="px-3 py-1 sm:h-10 hover:bg-accent/50 border"
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

export default LinkEncrypter;

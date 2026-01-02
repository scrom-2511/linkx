import axios from "axios";
import NavigationButton from "./NavigationButton";
import { useEffect, useState } from "react";
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
    <div className="h-full w-full flex flex-col items-center justify-center gap-8 text-white relative">
      <h1 className="font-secondary text-2xl font-bold mb-4 text-gray-200 max-[870px]:text-[16px]">
        EXPIRE LINK
      </h1>
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="w-[80%] h-[5%] border-solid border-gray-500 border-1 rounded-xl backdrop-blur-3xl p-6 font-secondary"
        placeholder="Enter Your URL"
      />
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="w-[80%] h-[5%] border-solid border-gray-500 border-1 rounded-xl backdrop-blur-3xl p-6 font-secondary uppercase"
        placeholder="Enter Your URL"
      />
      <input
        type="time"
        onChange={(e) => setTime(e.target.value)}
        className="w-[80%] h-[5%] border-solid border-gray-500 border-1 rounded-xl backdrop-blur-3xl p-6 font-secondary text-capitalize"
        placeholder="Enter Your URL"
      />
      {placeholder && (
        <input
          readOnly
          type="text"
          className="w-[80%] h-[5%] border-solid border-gray-500 border-1 rounded-xl backdrop-blur-3xl p-6 font-secondary placeholder-white"
          placeholder={placeholder}
          onClick={() => {
            navigator.clipboard.writeText(placeholder);
            setPlaceholder("Copied!");
          }}
        />
      )}
      <button
        onClick={submitDataAndGetUrl}
        className="border-solid border-gray-500 border-1 px-4 py-2 rounded-4xl font-primary font-medium text-sm cursor-pointer mb-10"
      >
        CREATE LINK!
      </button>
      <NavigationButton />
    </div>
  );
};

export default LinkExpirer;

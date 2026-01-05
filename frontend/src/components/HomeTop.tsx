import { CardDescription, CardTitle } from "./ui/card";

const HomeTop = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <CardTitle className="text-5xl font-bold text-muted-foreground sm:text-8xl sm:font-black">LINK-X</CardTitle>
      <CardDescription className="text-center text-md w-80 sm:w-2xl py-3 bg-background">A website to shorten, encrypt, expire, and generate qr code from a url.</CardDescription>
    </div>
  );
};

export default HomeTop;

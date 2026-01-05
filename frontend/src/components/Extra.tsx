import { CardDescription, CardTitle } from "./ui/card";

const Extra = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center w-full">
        <CardTitle className="text-5xl font-medium text-muted-foreground sm:text-8xl sm:font-black">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-md py-3 bg-background">
          {description}
        </CardDescription>
      </div>
    </div>
  );
};

export default Extra;

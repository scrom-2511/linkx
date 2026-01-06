import HomeTop from "@/components/HomeTop";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordChecker } from "@/services/passwordChecker";
import { useCurrentUrlStore } from "@/zustand/store";
import { redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Encrypted = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-[250px_auto] sm:grid sm:grid-rows-2 p-10">
      <HomeTop />
      <div className="w-full h-full flex justify-center sm:h-32">
        <Card className="w-full h-full justify-between border border-border sm:p-10 p-8 sm:max-w-5xl sm:min-h-[420px]">
          <div>
            <CardTitle className="text-xl font-bold mb-2">
              ENTER PASSWORD
            </CardTitle>
            <CardDescription className="text-sm">
              Enter the password to access the website.
            </CardDescription>
          </div>
          <Features />
          <FeatureCardsBtns />
        </Card>
      </div>
    </div>
  );
};

export default Encrypted;

const FeatureCardsBtns = () => {
  const parts = window.location.href.split("/");
  const link = parts[parts.length - 1];
  const currentInputUrl = useCurrentUrlStore((state) => state.currentInputUrl);
  const setCurrentResultUrl = useCurrentUrlStore(
    (state) => state.setCurrentResultUrl
  );
  const handleOnClickSubmitBtn = async () => {
    const passowrdChecker = new PasswordChecker();
    const res = await passowrdChecker.check({
      encryptedLink: link,
      password: currentInputUrl,
    });
    if (res.success) {
      window.location.href = res.data.passwordCheckeredLink
    } else {
      setCurrentResultUrl({type: "error", errorMessage: res.error.message});
    }
  };

  return (
    <div className="flex flex-col">
      <Button
        className="w-full font-bold mb-4 cursor-pointer"
        onClick={handleOnClickSubmitBtn}
      >
        Proceed to website.
      </Button>
    </div>
  );
};

const Features = () => {
  const setCurrentInputUrl = useCurrentUrlStore(
    (state) => state.setCurrentInputUrl
  );
  return (
    <Input
      type="url"
      placeholder="Enter the url"
      className="border placeholder:font-light sm:h-20 text-2xl"
      onChange={(e) => setCurrentInputUrl(e.target.value)}
    />
  );
};

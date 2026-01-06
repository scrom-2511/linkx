import { useCurrentUrlStore, useExtraInputFields } from "@/zustand/store";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { Download, Maximize } from "lucide-react";
import { useRef } from "react";
import QRCode from "react-qr-code";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LinkToQR = () => {
  const setCurrentInputUrl = useCurrentUrlStore(
    (state) => state.setCurrentInputUrl
  );
  const s = useExtraInputFields((state) => state.renderer)
  const renderqr = useExtraInputFields((state) => state.renderer);
  const setRenderer = useExtraInputFields((state) => state.setRenderer);
  const currentInputUrl = useCurrentUrlStore((state) => state.currentInputUrl);
  const qrCodeRef = useRef(null);
  const pngUrlRef = useRef(null);

  const onClickDownload = async () => {
    if (qrCodeRef.current) {
      const dataUrl = await htmlToImage.toPng(qrCodeRef.current, {
        quality: 1.0,
        pixelRatio: 4,
      });
      if (pngUrlRef.current) {
        (pngUrlRef.current as HTMLAnchorElement).href = dataUrl;
        (pngUrlRef.current as HTMLAnchorElement).download = "qr.png";
        (pngUrlRef.current as HTMLAnchorElement).click();
      }
    }
    setRenderer(false);
  };
  if (renderqr === false)
    return (
      <Input
        type="url"
        placeholder="Enter the url"
        className="border text-sm placeholder:font-light sm:h-10"
        onChange={(e) => setCurrentInputUrl(e.target.value)}
      />
    );

  if (renderqr === true)
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.05,
          filter: "blur(12px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }} className="flex gap-5 items-center justify-center">
        <QRCode
          ref={qrCodeRef}
          value={currentInputUrl}
          size={200}
          bgColor="#00000000"
          fgColor="#a995c9"
        ></QRCode>
        <a ref={pngUrlRef} style={{ display: "none" }} />
        <div className="flex flex-col gap-5">
          <Button onClick={onClickDownload}>
            <Download />
          </Button>
          <Button>
            <Maximize />
          </Button>
        </div>
      </motion.div>
    );
};

export default LinkToQR;

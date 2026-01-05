import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";
import { Input } from "./ui/input";
import { useCurrentUrlStore, useExtraInputFields } from "@/zustand/store";
import { Download, Maximize } from "lucide-react";
import { Button } from "./ui/button";
const LinkToQR = () => {
  const setCurrentInputUrl = useCurrentUrlStore(
    (state) => state.setCurrentInputUrl
  );
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
        className="border placeholder:font-light sm:h-20 text-2xl"
        onChange={(e) => setCurrentInputUrl(e.target.value)}
      />
    );

  if (renderqr === true)
    return (
      <div className="flex gap-5 items-center justify-center">
        <QRCode
          ref={qrCodeRef}
          value={currentInputUrl}
          size={200}
          bgColor="#00000000"
          fgColor="#a995c9"
        ></QRCode>
        <div className="flex flex-col gap-5">
          <Button onClick={onClickDownload}>
            <Download />
          </Button>
          <Button>
            <Maximize />
          </Button>
        </div>
      </div>
    );
};

export default LinkToQR;

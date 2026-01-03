import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from 'react-qr-code';
import NavigationButton from "./NavigationButton";
const LinkToQR = () => {
    const [input, setInput] = useState("");
    const [renderqr, setrenderer] = useState(false);
    const qrCodeRef = useRef(null);
    const pngUrlRef = useRef(null);
    const submitDataAndGetUrl = async () => {
        try {
            setrenderer(true)
        } catch (error) {
            console.log(error)
        }
    };
    const onClickDownload = async()=>{
        if (qrCodeRef.current) {
            const dataUrl = await htmlToImage.toPng(qrCodeRef.current,{
                quality: 1.0,
                    pixelRatio: 4,
            });
            if(pngUrlRef.current){
                (pngUrlRef.current as HTMLAnchorElement).href = dataUrl;
                (pngUrlRef.current as HTMLAnchorElement).download = "qr.png";
                (pngUrlRef.current as HTMLAnchorElement).click();
            }
        }
        setrenderer(false)
    }
    if(renderqr === false) return (
        <div
            className="h-full w-full flex flex-col items-center justify-center gap-8 text-white relative"
        >
            <h1 className="font-geist text-2xl font-bold mb-4 text-gray-200 max-[870px]:text-[16px]">
                QR GENERATOR
            </h1>
            <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="w-[80%] h-[5%] border-solid border-gray-500 border-1 rounded-xl backdrop-blur-3xl p-6 font-geist"
                placeholder="Enter Your URL"
            />
            <button
                onClick={input === ""?undefined:submitDataAndGetUrl} 
                className="border-solid border-gray-500 border-1 px-4 py-2 rounded-4xl font-primary font-medium text-sm cursor-pointer mb-10"
            >
                GENERATE QR!
            </button>
            <NavigationButton/>
        </div>
    );

    if(renderqr === true) return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-10 text-white ">
            <QRCode ref={qrCodeRef} value={input} bgColor="#00000000" fgColor="#ebe6e7"></QRCode>
            <a href="" ref={pngUrlRef} className="hidden"></a>
            <button
                onClick={onClickDownload}
                className="border-solid border-gray-500 border-1 px-4 py-2 rounded-4xl font-primary font-medium text-sm cursor-pointer"
            >
                DOWNLOAD
            </button>
        </div>
    )
};

export default LinkToQR;

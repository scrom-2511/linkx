import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import LinkShortner from "../components/LinkShortner";
import LinkEncrypter from "./LinkEncrypter";
import LinkToQR from "./LinkToQR";
import LinkExpirer from "./LinkExpirer";
const HomeRight = () => {
  return (
    <div
      className="h-[70%] w-[40%] mr-30 rounded-2xl max-[1575px]:mr-0 max-[1575px]:w-[70%] max-[1575px]:h-[50%]"
      style={{
        background:
          "linear-gradient(to bottom right, #161a1d 5%, #27292b 30%,#09090a )",
      }}
    >
      <Features />
    </div>
  );
};

const Features = () => {
  const feature = useSelector((state: RootState) => state.feature.value);

  if (feature === 1) {
    return <LinkShortner />;
  } else if (feature === 2) {
    return <LinkEncrypter />;
  } else if (feature === 3) {
    return <LinkExpirer />;
  } else if (feature === 4) {
    return <LinkToQR />;
  }
};
export default HomeRight;

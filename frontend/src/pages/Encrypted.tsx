import HomeLeft from "../components/HomeLeft";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../features/LinkEncrypter/PasswordSlice";
import axios from "axios";
import { RootState } from "../app/store";
const Encrypted = () => {
  const password = useSelector((state: RootState) => state.password.value);
  const dispatch = useDispatch();

  const redirectToPage = async () => {
    try {
      const customLink = window.location.href.split("?")[1];
      const response = await axios.post(
        `http://localhost:3000/encrypted/${customLink}`,
        {
          password
        }
      );
      if (response.data.message === "Success") {
        console.log(response.data.link);
        window.location.href = response.data.link;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-row items-center gap-60 max-[1575px]:flex-col max-[1575px]:gap-20">
      <HomeLeft />
      <div
        className="h-[70%] w-[40%] mr-30 rounded-2xl max-[1575px]:mr-0 max-[1575px]:w-[70%] max-[1575px]:h-[50%]"
        style={{
          background:
            "linear-gradient(to bottom right, #161a1d 5%, #27292b 30%,#09090a )",
        }}
      >
        <div className="h-full w-full flex flex-col items-center justify-center gap-8 text-white relative">
          <h1 className="font-secondary text-2xl font-bold mb-4 text-gray-200 max-[870px]:text-[16px]">
            ENTER YOU PASSWORD
          </h1>
          <input
            onChange={(e) => dispatch(updatePassword(e.target.value))}
            type="text"
            className="w-[80%] h-[5%] border-solid border-gray-500 border-1 rounded-xl backdrop-blur-3xl p-6 font-secondary"
            placeholder="PASSWORD"
          />
          <button
            onClick={redirectToPage}
            className="border-solid border-gray-500 border-1 px-6 py-2 rounded-4xl font-primary font-medium text-sm cursor-pointer mb-10"
          >
            OPEN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Encrypted;

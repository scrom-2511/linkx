import React from "react";
import { updateFeature } from "../features/Feature/FeatureSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

const NavigationButton = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state: RootState) => state.feature.value);

  const prevFeature = () => {
    if (feature === 1) {
        dispatch(updateFeature(4));
    } else {
        dispatch(updateFeature(feature - 1));
    }
};

const nextFeature = () => {
    if (feature === 4) {
        dispatch(updateFeature(1));
    } else {
        dispatch(updateFeature(feature + 1));
    }
};
  return (
    <div className="flex h-[5%] w-[100%] justify-between px-10 mt-8 absolute bottom-20">
      {[{ src: "/l.svg", onclick: prevFeature }, { src: "/r.svg", onclick: nextFeature }].map((item, i) => (
        <img
          key={i}
          src={item.src}
          onClick={item.onclick}
          alt=""
          className="h-7 w-7 invert transition-transform duration-150 cursor-pointer hover:scale-150"
        />
      ))}
    </div>
  );
};

export default NavigationButton;

import { motion } from "framer-motion";
import { LayoutTextFlipHome } from "./TextFlip";

const HomeTop = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -12,
      }}
      animate={{
        opacity: 1,
        y: 0, 
      }}
      transition={{
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut",
      }}
      className="flex flex-col items-center justify-end w-full h-full"
    >
      <LayoutTextFlipHome />
    </motion.div>
  );
};

export default HomeTop;

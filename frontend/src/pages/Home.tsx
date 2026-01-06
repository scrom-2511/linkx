import HomeBottom from "@/components/HomeBottom";
import HomeTop from "@/components/HomeTop";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
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
        }}
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('4.jpg')" }}
      />

      <div className="relative z-10 w-screen h-screen grid grid-rows-[250px_auto] p-10">
        <HomeTop />
        <HomeBottom />
      </div>
    </div>
  );
};

export default Home;

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export function LayoutTextFlipHome() {
  return (
    <div>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          words={["Shorten", "Encrypt", "Expire", "ToQr"]}
          text=" your links "
        />
      </motion.div>
      <p className="text-l font-light lg md:text-xl text-right mt-3">
        - everything at one place.
      </p>
    </div>
  );
}

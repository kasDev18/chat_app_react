import { createContext } from "react";
import * as motion from "motion/react-client";

const EnterAnimationContext = createContext();

export const EnterAnimationProvider = ({ children }) => {
  return (
    <EnterAnimationContext.Provider value="">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        {children}
      </motion.div>
    </EnterAnimationContext.Provider>
  );
};

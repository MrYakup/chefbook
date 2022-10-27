import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

function Slide() {
  const [position, setPosition] = useState(0);
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1600289031464-74d374b64991?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
    },
  ];
  const handleSwipe = ({ dir }) => {
    if (dir === "Left") {
      if (position < slides.length - 1) {
        setPosition(position + 1);
      }
    }
    if (dir === "Right") {
      if (position > 0) {
        setPosition(position - 1);
      }
    }
  };

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    onTouchStartOrOnMouseDown: ({ event }) => event.preventDefault(),
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true
  });

  return (
    <div
      {...handlers}
      className="w-full h-[26vh] overflow-hidden p-0 m-0 flex justify-center items-center sm:h-[46vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[76vh]"
    >
      <div className="relative ">
        {slides.map((slide, index) => (
          <motion.div
            className="w-[61vw] h-[21vh] overflow-hidden bg-white rounded-3xl absolute left-[-10vw] top-[-11vh]
                      sm:top-[-20vh] sm:left-[-30vw] sm:h-[40vh]
                      md:h-[44vh] md:top-[-21vh]
                      lg:h-[52vh] lg:top-[-26vh]
                      xl:h-[62vh] xl:top-[-31vh]
                      2xl:h-[64vh] 2xl:top-[-32vh] "
            initial={{ scale: 0.4, rotate: 0 }}
            animate={{
              rotate: 0,
              left: `${(index - position) * 60 - 30}vw`,
              scale: index === position ? 1 : 0.86,
              opacity: index === position ? 1 : 0.4
            }}
            transition={{ type: "spring", stiffness: 160, damping: 23 }}
            key={index}
            
          >
            <img
              className="object-cover object-center w-full h-full"
              src={`${slide.url}`}
              alt=""
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Slide;

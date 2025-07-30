import { useEffect, useState, useCallback } from "react";
import { Mentor } from "@/types/user";
import FirstLook from "@/components/user/home/FirstLook";
import MentorSection from "@/components/user/home/MentorSession";
import KeyFeatures from "@/components/user/home/KeyFeatures";
import SecondLook from "@/components/user/home/SecondLook";
import { motion, AnimatePresence } from "framer-motion";
import useFetchMentorsList from "@/hooks/useFetchMentorsList";
import FAQ_Session from "@/components/user/home/FaqSession";
import HeroWebinar from "@/components/user/home/heroSection/WebinarSection";
// import Tutorials from "@/components/user/home/VideoSection";

const HomePage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const { getAllMentors } = useFetchMentorsList();

  const fetchTopMentors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllMentors({ type: "top", limit: 5 });
      setMentors(response?.mentors || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopMentors();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev % 3) + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-[90dvh] h-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full"
          >
            {currentSlide === 1 ? (
              <HeroWebinar />
            ) : currentSlide === 2 ? (
              <SecondLook key="second" />
            ) : (
              <FirstLook key="first" />
            )}
          </motion.div>
          <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-3 w-3 rounded-full cursor-pointer border-2 border-purple-500 ${currentSlide === i ? "bg-gradient-to-r from-purple-500 to-purple-500/70 w-10" : "bg-transparent"} transition-all duration-200`}
                aria-label={`Go to slide ${i}`}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>

      <MentorSection mentors={mentors} loading={loading} />
      {/* <Tutorials /> */}
      <KeyFeatures />
      <FAQ_Session />
    </>
  );
};

export default HomePage;

import { useEffect, useState, useCallback } from "react";
import { Mentor } from "@/types/user";
import FirstLook from "@/components/user/home/FirstLook";
import MentorSection from "@/components/user/home/MentorSession";
import KeyFeatures from "@/components/user/home/KeyFeatures";
import SecondLook from "@/components/user/home/SecondLook";
import { motion, AnimatePresence } from "framer-motion";
import useFetchMentorsList from "@/hooks/useFetchMentorsList";
import FAQ_Session from "@/components/user/home/FaqSession";
// import Tutorials from "@/components/user/home/VideoSection";

const HomePage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState(0);
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
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative h-[90dvh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full"
          >
            {currentSlide === 0 ? (
              <SecondLook key="second" />
            ) : (
              <FirstLook key="first" />
            )}
          </motion.div>
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

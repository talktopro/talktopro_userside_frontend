import { ShieldCheck, UserPlus, ClipboardList } from "lucide-react";

const KeyFeatures = () => {
  return (
    <section className="flex justify-center py-10 pb-25 homepage_keyFeatures_bg">
      <div className="max-w-6xl px-8 not-sm:px-4">
        <div className="text-center mb-12">
          <h1 className="text-2xl lg:text-3xl not-sm:text-xl font-bold">
            Key <span className="text-purple-500">Features</span>
          </h1>
          <p className="text-lg mt-2 not-sm:text-sm mx-auto">
            Discover how Talk to Pro bridges the gap between seekers and
            providers of professional guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-sm:gap-3">
          <div className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow in-dark:border">
            <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
              <ShieldCheck className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl not-sm:text-lg font-semibold mb-3">
              Verified Professionals
            </h3>
            <p className="opacity-70 not-sm:text-sm">
              Connect only with thoroughly vetted professionals. Our rigorous
              verification process ensures you get quality guidance.
            </p>
          </div>

          <div className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow in-dark:border">
            <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
              <UserPlus className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl not-sm:text-lg font-semibold mb-3">
              Become a Mentor
            </h3>
            <p className="opacity-80 not-sm:text-sm">
              Share your expertise by registering as a mentor. Complete your
              profile with credentials and experience to start guiding others.
            </p>
          </div>

          <div className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow in-dark:border">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
              <ClipboardList className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl not-sm:text-lg font-semibold mb-3">
              Structured Onboarding
            </h3>
            <p className="opacity-80 not-sm:text-sm">
              Our step-by-step registration ensures only qualified professionals
              join. Submit documents and get verified to start mentoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;

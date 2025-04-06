import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CAREER_QUESTIONS = [
  {
    id: "q1",
    question: "How can Talk to Pro help me choose the right career path?",
    answer: () => (
      <>
        <p className="mb-3">
          Our verified professionals provide industry-specific insights that
          help you:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Identify skills that align with future market demands</li>
          <li>Avoid common career-switching mistakes</li>
          <li>Create a personalized roadmap for your goals</li>
        </ul>
      </>
    ),
  },
  {
    id: "q3",
    question: "How do I know if I'm learning the right skills?",
    answer: () => (
      <>
        <p className="mb-4">
          Our professionals use a 3-step validation process:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li>Skill Relevance Check (Industry Demand Analysis)</li>
          <li>Personal Alignment Assessment</li>
          <li>Learning Efficiency Audit</li>
        </ol>
        <p className="text-sm">
          💡 92% of users reported better career clarity after 3 sessions
        </p>
      </>
    ),
  },
  {
    id: "q4",
    question: "What if I'm completely lost about where to start?",
    answer: () => (
      <>
        <p className="mb-4">
          Our <strong>Career GPS Assessment</strong> (free with signup) helps:
        </p>
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-2 p-3 bg-orange-50 in-dark:bg-orange-500/10 rounded-lg">
            <span className="text-xl">🧭</span>
            <div>
              <h4 className="font-semibold">1. Identify Core Strengths</h4>
              <p className="text-sm">Through psychometric evaluation</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 in-dark:bg-slate-800/50 rounded-lg">
            <span className="text-xl">🎯</span>
            <div>
              <h4 className="font-semibold">2. Match with Industry Paths</h4>
              <p className="text-sm">Based on 2024 hiring trends</p>
            </div>
          </div>
        </div>
        <p className="text-sm opacity-80 mb-4">
          💡 78% of users found their direction within 2 weeks using this tool
        </p>
      </>
    ),
  },
  {
    id: "q5",
    question: "How do you verify your professionals' expertise?",
    answer: () => (
      <>
        <p className="mb-4 font-semibold text-green-700">
          ⚡ Triple Verification Process:
        </p>
        <ul className="space-y-3 mb-4">
          <li className="flex gap-2 in-dark:opacity-80">
            <span className="bg-blue-100 in-dark:bg-slate-800/50 py-1 px-2.5 rounded">
              1
            </span>
            Manual evaluation by our expert review team
          </li>
          <li className="flex gap-2 in-dark:opacity-80">
            <span className="bg-blue-100 in-dark:bg-slate-800/50 py-1 px-2.5 rounded">
              2
            </span>
            Industry certification validation and background checks
          </li>
          <li className="flex gap-2 in-dark:opacity-80">
            <span className="bg-blue-100 in-dark:bg-slate-800/50 py-1 px-2.5 rounded">
              3
            </span>
            One-on-one session evaluation with our quality assurance specialists
          </li>
        </ul>
        <div className="p-4 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
          <p className="text-sm">
            🔒 All mentors undergo re-verification every 6 months
          </p>
        </div>
      </>
    ),
  },
];

const FAQ_Session = () => {
  return (
    <section className="w-screen faq_bg rounded-t-4xl">
      <div className="pt-15 sm:px-8 px-8 not-sm:px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4 my-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-left">FAQs</h2>
            <p className="text-md text-muted-foreground">
              Everything you need to know about career guidance and mentorship.
              Can't find the answer you're looking for? Please chat with our
              friendly team of career advisors.
            </p>
          </div>

          <div>
            <Accordion type="single" collapsible className="w-full">
              {CAREER_QUESTIONS.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="hover:no-underline py-6 not-sm:py-3 rounded-lg mb-2 text-left">
                    <span className="text-lg not-sm:text-sm">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-4 pb-6 rounded-b-lg">
                    <item.answer />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ_Session;

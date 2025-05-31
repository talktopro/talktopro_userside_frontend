import { PRIVACY_CONTENT, FOOTER_CONTENT } from "@/constants/policies";

const PrivacyAndPolicy = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 md:p-8">
      <div className="max-w-4xl mx-auto overflow-hidden rounded-xl">

        <div className="p-6 not-sm:px-2 not-sm:py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-purple-500">
              {PRIVACY_CONTENT.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {PRIVACY_CONTENT.lastUpdated}
            </p>
          </div>
        </div>

        <div className="p-2 md:p-8">
          <div className="space-y-8">
            {PRIVACY_CONTENT.sections.map((section, index) => (
              <div
                key={index}
                className="group last:pb-4"
                id={`section-${index}`}
              >

                <h3 className="md:text-lg font-semibold mb-3 flex items-center">
                  <span className="mr-2 text-purple-500">{index + 1}.</span>
                  {section.title}
                </h3>

                <p className="whitespace-pre-line leading-relaxed pl-5 border-l-2 text-muted-foreground text-sm not-sm:text-xs">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted px-6 py-6 text-center rounded-xl">
          <div className="max-w-md mx-auto">
            <p className="text-sm">
              {FOOTER_CONTENT.contact}
            </p>
            <p className="text-xs mt-2">
              {FOOTER_CONTENT.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyAndPolicy;
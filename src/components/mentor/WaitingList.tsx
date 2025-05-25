import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ShieldPlus,
  CopyIcon,
  CheckIcon,
  Hourglass,
} from "lucide-react";
import { useState } from "react";
import CustomTooltip from "../common/CustomTooltip";

interface WaitingPeriodProps {
  submissionDate: Date;
  estimatedReviewTime?: number;
  email: string;
  applicationId: string;
}

const WaitingPeriod: React.FC<WaitingPeriodProps> = ({
  estimatedReviewTime = 24,
  email,
  applicationId,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden p-6">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 in-dark:bg-muted">
            <Hourglass className="h-8 w-8 text-purple-600 in-dark:text-purple-100" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Application Under Review</h1>
          <p className="mt-2 opacity-70">
            Thank you for submitting your professional profile to Talk to Pro!
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-100 in-dark:bg-muted p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <ShieldCheckIcon className="h-5 w-5 text-purple-600 in-dark:text-purple-100" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-purple-600 in-dark:text-purple-100">
                  Verification Process
                </h3>
                <div className="mt-2 text-sm text-purple-600 in-dark:text-purple-100">
                  <p>
                    Our admin team is carefully reviewing your application to
                    ensure you meet our professional standards. This process
                    typically takes up to {estimatedReviewTime} hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-medium">Application Details</h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium">Application ID</dt>
                <dd className="mt-1 text-sm flex items-center gap-2">
                  <span className="truncate">{applicationId}</span>
                  <button
                    onClick={handleCopyId}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <CustomTooltip
                      content={copied ? "Copied!" : "Copy"}
                      trigger={
                        copied ? (
                          <CheckIcon className="h-4 w-4 opacity-70" />
                        ) : (
                          <CopyIcon className="h-4 w-4 opacity-70" />
                        )
                      }
                    />
                  </button>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium">Contact email</dt>
                <dd className="mt-1 text-sm">{email}</dd>
              </div>
            </dl>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-medium">What happens next?</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    <span className="font-medium">Approval:</span> Once
                    approved, you'll receive an email notification and can start
                    your Talk to Pro professional journey immediately.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldPlus className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    <span className="font-medium">Additional Information:</span>{" "}
                    If we need more details, we'll contact you at the email
                    address you provided.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium">Need help?</h3>
                <div className="mt-2 text-sm">
                  <p>
                    If you have any questions about your application status,
                    please contact our support team at
                    <a
                      href="mailto:support@talktopro.com"
                      className="text-purple-600 hover:text-purple-500 ml-1"
                    >
                      admin@talktopro.in
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingPeriod;

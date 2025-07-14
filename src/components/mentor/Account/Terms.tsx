import { IMentorAccountFormType } from '@/schema/mentorAccountSettings.schema';
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface ITermsProps {
  form: UseFormReturn<IMentorAccountFormType>;
}

const Terms: FC<ITermsProps> = ({ form }) => {
  return (
    <div className='max-w-sm mx-auto'>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          By agreeing, you acknowledge that you have read and
          understood our terms. <span className="underline cursor-pointer text-purple-500">Terms and Condition</span>
        </p>
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      form.trigger("termsAndConditions");
                    }}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium">
                  I agree to the Terms and Conditions
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}

        />
        <p className="text-xs text-muted-foreground mt-10">
          Your data will be processed in accordance with our privacy
          policy. <span className="underline cursor-pointer text-purple-500">Privacy and Policy</span>
        </p>
        <FormField
          control={form.control}
          name="privacyAndPolicy"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      form.trigger("privacyAndPolicy");
                    }}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium">
                  I agree to the Privacy Policy
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default Terms
import { X, Check } from 'lucide-react';
import CustomTooltip from '@/components/common/CustomTooltip';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const amountFormSchema = z.object({
   amount: z
      .number()
      .min(300, {
         message: "Minimum amount is ₹300",
      })
      .max(5000, {
         message: "Maximum amount is ₹5000",
      }),
});

type AmountFormValues = z.infer<typeof amountFormSchema>;

interface IPricingFormProps {
   form: UseFormReturn<AmountFormValues>;
   handleSubmit: (e: React.FormEvent) => void;
   handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   hasChanges: boolean;
   handleSave: (values: AmountFormValues) => void;
   handleCancel: () => void;
};

const PricingForm: FC<IPricingFormProps> = ({
   form,
   handleAmountChange,
   handleCancel,
   handleSave,
   handleSubmit,
   hasChanges
}) => {
   return (
      <Form {...form}>
         <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit}
            noValidate
         >
            <FormField
               control={form.control}
               name="amount"
               render={({ field }) => (
                  <FormItem className='mb-10'>
                     <FormControl>
                        <div className="flex items-center justify-center mt-10">
                           <input
                              type="text"
                              autoFocus
                              className="text-4xl w-32 font-bold focus:outline-none text-center"
                              value={`₹${field.value}`}
                              onChange={handleAmountChange}
                              maxLength={6}
                           />
                           {hasChanges && (
                              <div className="flex mt-1">
                                 <CustomTooltip
                                    content='Save amount'
                                    trigger={
                                       <button
                                          type="submit"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             e.preventDefault();
                                             handleSave(form.getValues());
                                          }}
                                       >
                                          <Check
                                             size={15}
                                             className="hover:text-green-600"
                                          />
                                       </button>
                                    }
                                 />
                                 <CustomTooltip
                                    content='Cancel'
                                    trigger={
                                       <button
                                          type="button"  // Explicitly set to type="button"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             handleCancel();
                                          }}
                                       >
                                          <X
                                             size={15}
                                             className="hover:text-red-600"
                                          />
                                       </button>
                                    }
                                 />
                              </div>
                           )}
                        </div>
                     </FormControl>
                     <FormMessage className='text-center' />
                  </FormItem>
               )}
            />
         </form>
      </Form>
   )
}

export default PricingForm;
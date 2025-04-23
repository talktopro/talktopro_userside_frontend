import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PricingTips from '@/components/mentor/PricingTips';
import PricingForm from '@/components/mentor/PricingForm';
import { toast } from 'sonner';
import apiClient from '@/api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, updateUser } from '@/redux/slices/authSlice';

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

const Pricing = () => {

  const { user } = useSelector(selectAuth)
  const form = useForm<AmountFormValues>({
    resolver: zodResolver(amountFormSchema),
    defaultValues: {
      amount: user?.mentorDetails?.price || 0
    }
  });
  const currentAmount = form.watch('amount');
  const initialAmount = form.formState.defaultValues?.amount || 0;
  const hasChanges = currentAmount !== initialAmount;
  const dispatch = useDispatch();

  const handleSave = async (values: AmountFormValues) => {
    try {
      if (values.amount < 300 || values.amount > 5000) {
        return;
      }
      await apiClient.patch(`/mentor/fee`, { fee: values.amount });
      if (user?.mentorDetails) {
        dispatch(updateUser({ mentorDetails: { ...user?.mentorDetails, price: values.amount } }))
      }
      form.reset({ amount: values.amount });
    } catch (error) {
      toast.error("Failed to save price.");
      console.log("Error occured from handle price save", error);
    }
  };

  const handleCancel = () => {
    form.reset({ amount: initialAmount });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = value ? parseInt(value, 10) : 0;
    form.setValue('amount', numValue, { shouldValidate: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasChanges) {
      handleSave(form.getValues());
    }
  };

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-2xl not-sm:text-lg font-bold pb-10">
        Pricing
      </h2>

      <div className="flex flex-col gap-1 mb-8 max-w-4xl mx-auto">
        <h2 className="text-md font-semibold text-center m-0">
          Set Your Session Price
        </h2>
        <p className="text-center not-sm:text-xs m-0 mx-auto my-3 max-w-2xl">
          Set your pricing for appointments before allocating slots. Review the "Pricing Tips and Information" section to clarify any questions and understand how pricing works.
        </p>

        <PricingForm
          form={form}
          handleAmountChange={handleAmountChange}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleSubmit={handleSubmit}
          hasChanges={hasChanges}
        />
        <PricingTips />
      </div>
    </div>
  );
};

export default Pricing;
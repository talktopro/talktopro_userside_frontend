import Lottie from "react-lottie"
import animationData from '@/assets/Lottie/SuccessPayment.json';

function SuccessPaymentLottie() {

   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
   };

   return (
      <Lottie
         options={defaultOptions}
         width={300}
         height={300}
         speed={0.75}
      />
   );
};

export default SuccessPaymentLottie;
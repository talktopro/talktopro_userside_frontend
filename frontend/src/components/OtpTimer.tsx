import { useEffect, useRef } from 'react';
import { decrementTimer, selectOtp } from '@/redux/slices/otpSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useOtpTimer = () => {
    const dispatch = useDispatch();
    const { timer, isDisabled } = useSelector(selectOtp);



    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isDisabled) {
            intervalRef.current = setInterval(() => {
                dispatch(decrementTimer());
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isDisabled]);


    return { timer, isDisabled };
};

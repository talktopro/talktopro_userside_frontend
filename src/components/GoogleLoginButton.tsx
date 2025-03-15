import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { setUser } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { Button } from './ui/button';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
                    token: tokenResponse.access_token,
                });
                dispatch(setUser({ id: data.data?.id, accessToken: data.data?.accessToken }))
                navigate(ROUTES.HOME);

            } catch (error) {
                console.error('Authentication error:', error);
            }
        },
        onError: (error) => console.error('Login Failed:', error),
    });

    return (
        <Button variant="outline"
            onClick={() => handleGoogleLogin()}
            className="flex items-center justify-center gap-1 hover:cursor-pointer w-full"
        >
            <FcGoogle className='size-5' />
            <span>Sign in with Google</span>
        </Button>
    );
};

export default GoogleLoginButton;
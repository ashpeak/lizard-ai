import { useSearchParams } from 'react-router-dom';
import userAuth from '../lib/userAuth';
import { useEffect, useState } from 'react';
import { auth } from '../states/useAuth';
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function Verify() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email');
    const code = searchParams.get('code');
    const [loading, setLoading] = useState(true);

    const { checkAuth } = auth();

    const Verify = async () => {
        try {
            await userAuth.login({ email, code }, "email");
            checkAuth();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        if (!email || !code) {
            setLoading(false);
        } else Verify();

        if (!loading) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        return () => {
            clearTimeout();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, email, loading]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
            <div className="p-8 rounded-3xl flex justify-center items-center flex-col gap-y-6 z-10 w-full md:w-[26rem] text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark shadow-md">
                {loading ? (
                    <>
                        <div className="h-52 opacity-85 border-neutral-400 w-52 border-y-4 rounded-full animate-spin"></div>
                        <h2 className="text-2xl font-bold mb-4">Verifying...</h2>
                    </>
                ) : (
                    <>
                        <IoCloseCircle size={150} className="text-rose-500" />
                        <h2 className="text-2xl font-bold mb-4">Link is invalid</h2>
                    </>
                )}
            </div>
        </div>
    )
}

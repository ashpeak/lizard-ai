import { useEffect } from "react";
import { auth } from "../states/useAuth";
import { RxAvatar } from "react-icons/rx";
import { useQuery } from '@tanstack/react-query';
import userAuth from "../lib/userAuth";

export default function Account() {

    const user = auth((state) => state.user);
    const { checkAuth, logout } = auth((state) => state);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = tomorrow.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[tomorrow.getMonth()];

    const { data } = useQuery({ queryKey: ['profile'], queryFn: userAuth.profile, refetchOnWindowFocus: false });
    
    const percent = parseInt((15 - data?.credit) / 15 * 100);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center relative h-[93vh]">
            {/* Ambient backdrop */}
            <div className='absolute blur-2xl left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
                <div className='flex translate-y-20 md:translate-y-12'>
                    <div className='w-40 h-40 md:w-[20rem] md:h-[20rem] md:-ml-2 circle_red rounded-3xl'></div>
                </div>
                <div className='w-[20rem] h-[20rem] circle_yellow rounded-3xl' style={{ transform: 'translate(-14rem, 10rem)' }}></div>
            </div>

            <div className="flex flex-col md:w-[30rem] md:h-[35rem] z-20 items-center justify-center rounded-2xl dark:bg-secondary-dark bg-secondary-light p-4">
                {/* User Avatar */}
                <div className="p-1 border border-border-dark dark:border-border-light rounded-full">
                    {user?.avatar ? (
                        <img src={user?.avatar} alt="User Avatar" className="w-32 h-32 rounded-full" />
                    ) : (
                        <RxAvatar size={100} className="opacity-90" />
                    )}
                </div>

                <div className="flex flex-col gap-2 mt-8">
                    {/* User Name */}
                    <h1 className="text-2xl w-full text-center font-bold mb-2 opacity-95">{data?.name}</h1>
                    <p className="opacity-80 mt-2">{data?.email}</p>
                    {/* Credits left */}
                    <div>
                        <p className="opacity-80">Credits used: {15 - data?.credit}/15 ({percent}%)</p>
                        <p className="opacity-40 text-sm">(credits will reset on {month} {date}, 12:30 pm)</p>
                    </div>
                    {/* Files count */}
                    <p className="opacity-80">Active projects: {data?.filesCount}</p>
                </div>
                <div className="pt-12 md:pt-16 pb-6 md:pb-0">
                    <button onClick={logout} className="bg-rose-600 hover:bg-rose-500 flex items-center gap-1 text-white text-xl font-medium px-4 py-1 rounded-3xl transition-colors duration-150">Logout</button>
                </div>
            </div>
        </div>
    )
}

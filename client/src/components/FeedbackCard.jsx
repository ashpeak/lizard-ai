import { FaRegGrinHearts } from "react-icons/fa";
import { FaRegFaceSmile, FaRegFaceMeh } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
export default function FeedbackCard({ feeling, message, name }) {
    return (
        <div className='w-[20rem] h-[12.5rem] dark:bg-[#f3f5f412] bg-[#dbdbdb] rounded-3xl p-4'>
            <div className='flex items-center gap-4'>
                <img src='/images/avatar.png' alt='feedback' className='w-12 h-12 rounded-full' />
                <div>
                    <p className='text-[1.125rem] text-start opacity-85 leading-4'>{name}</p>
                    <p>
                        {feeling === 'loved' && <span className='flex gap-2 items-center opacity-80'><FaRegGrinHearts className='text-rose-500' /> Loved it!</span>}
                        {feeling === 'good' && <span className='flex gap-2 items-center opacity-80'><FaRegFaceSmile className='text-green-500' /> Good</span>}
                        {feeling === 'average' && <span className='flex gap-2 items-center opacity-80'><FaRegFaceMeh className='text-amber-500' /> Average</span>}
                    </p>
                </div>
            </div>
            <div className='mt-3'>
                <h2 className='text-base md:text-lg opacity-90 dark:text-[#fafafa] text-text-light text-start font-bold'>Feedback</h2>
                <p className='scroll-hide max-h-[5rem] overflow-y-scroll text-sm text-start opacity-75'>{message}</p>
            </div>
        </div>
    )
}

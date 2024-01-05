import { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MdStopCircle } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { getStockMusic } from '../lib/media';
import { HiMiniSpeakerWave } from 'react-icons/hi2';
import { settings } from '../states/settings';

export default function StockMusicLibrary({ handleClose }) {
    const setBgMusic = settings((state) => state.setBgMusic);
    const [search, setSearch] = useState({
        query: '',
        filter: 'music'
    });
    const [playing, setPlaying] = useState({
        isPlaying: false,
        link: ''
    });
    const [audio, setAudio] = useState(new Audio());


    const durationToTime = (duration) => {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);

        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        return `(${minutes}:${seconds})`;
    }

    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    }

    const playMusic = (music) => {
        if (music) {
            audio.src = music;
            audio.play();
            setPlaying({ isPlaying: true, link: music});
        }
    };

    const pauseMusic = () => {
        audio.pause();
        setPlaying({ isPlaying: false, link: ''});
    };

    useEffect(() => {
        // Cleanup previous audio when the component unmounts or when music changes
        return () => {
            audio.pause();
            setPlaying({ isPlaying: false, link: ''});
            audio.src = '';
        };
    }, [audio]);

    const { isPending, data, isError, refetch } = useQuery({ queryKey: ['stockMusic'], queryFn: () => getStockMusic(search.query, search.filter), refetchOnWindowFocus: false });

    return (
        <div>
            <div className='border-b border-border-light dark:border-border-dark w-full'>
                <form onSubmit={handleSearch}>
                    <div className='w-full px-2 md:px-4 py-3 flex items-center justify-between gap-x-4'>
                        <input
                            className="outline-none w-full h-10 rounded-3xl bg-primary-light dark:bg-primary-dark border border-neutral-400 px-4 opacity-70"
                            value={search.query}
                            onChange={(e) => setSearch({ ...search, query: e.target.value })}
                            type="text"
                            required
                            placeholder='Search for music (eg: rock, reverb, lovely)' />
                        <button type='submit' className='p-2 hover:bg-neutral-300 hover:dark:bg-neutral-700 transition-colors duration-200 flex items-center justify-center rounded-full'>
                            <FiArrowRight size={20} className='opacity-80' />
                        </button>
                    </div>
                    <div className='flex items-center gap-x-3 pl-4 mb-3'>
                        <label className='cursor-pointer flex items-center gap-[0.35rem]'>
                            <input type='radio' onChange={(e) => setSearch({ ...search, filter: e.target.value })} name='type' value='music' className='accent-red-500' defaultChecked />
                            <p>Music</p>
                        </label>
                        <label className='cursor-pointer flex items-center gap-[0.35rem]'>
                            <input type='radio' onChange={(e) => setSearch({ ...search, filter: e.target.value })} name='type' value='sfx' className='accent-red-500' />
                            <p>Sound effects</p>
                        </label>
                    </div>
                </form>
            </div>

            <div className='px-2 bg-primary-light dark:bg-primary-dark md:px-4 py-3 grid grid-cols-2 gap-y-5 gap-x-6 overflow-y-scroll h-[70vh]'>
                {data?.length > 0 && data.map((media, index) => (
                    <div key={index} className='h-fit group'>
                        <div className='flex h-fit items-center gap-x-2 opacity-70 group-hover:opacity-90 transition-opacity duration-200'>
                            <button type='button' onClick={() => {
                                if (playing.isPlaying === true && playing.link === media.preview) {
                                    pauseMusic();
                                } else {
                                    playMusic(media.preview);
                                }
                            }}>
                                {(playing.link === media.preview && playing.isPlaying === true) ? <MdStopCircle size={18} /> : <HiMiniSpeakerWave size={18} />}
                            </button>
                            <div className='flex gap-1 font-bold'>
                                <button type='button' className='h-fit' onClick={() => {
                                    setBgMusic({ name: media.name, preview: media.preview });
                                    handleClose();
                                }}>
                                    <p className='line-clamp-1 text-[1rem] text-start'>{media.name.length > 20 ? media.name.substring(0, 20) + '...' : media.name}</p>
                                </button>
                                <p className='text-[0.9rem] text-start'>{durationToTime(media.duration)}</p>
                            </div>
                        </div>
                        <div className='opacity-70'>
                            <p className='text-[0.75rem] text-start line-clamp-4 tracking-tight'>{media.description.length > 200 ? media.description.substring(0, 200) + '...' : media.description}</p>
                        </div>
                    </div>
                ))}

                {data?.length === 0 && (
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-base opacity-70'>
                            {isPending && "Loading music..."}
                            {isError && "Failed to load resources."}
                            {data.length === 0 && !isPending && !isError && "No music found."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
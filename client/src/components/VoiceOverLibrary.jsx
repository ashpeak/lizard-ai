import { useEffect, useState } from 'react'
import { MdStopCircle } from "react-icons/md";
import { HiMiniSpeakerWave } from 'react-icons/hi2';
import { settings } from '../states/settings';

const voices = [
    {
        name: 'Guy - English',
        preview: 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439350/bulbul/j9mhiogeymtcajabbsui.mp3',
        id: 'guy-en'
    },
    {
        name: 'Jenny - English',
        preview: 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439260/bulbul/ib8jji9oxk46xipjthwh.mp3',
        id: 'jenny-en'
    },
    {
        name: 'Ashish Singh - English',
        preview: 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439318/bulbul/u7xgvfsgcizzr9tqkzjj.mp3',
        id: 'ashish-en'
    },
    {
        name: 'Ashish Singh - Hindi',
        preview: 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439318/bulbul/u7xgvfsgcizzr9tqkzjj.mp3',
        id: 'ashish-hi'
    },
    {
        name: 'Madhur - Hindi',
        preview: 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439259/bulbul/yfvjxlotb9dzppq0zh2t.mp3',
        id: 'madhur-hi'
    },
    {
        name: 'Swara - Hindi',
        preview: 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439259/bulbul/bqkozr9kokbmt3ujhq6g.mp3',
        id: 'swara-hi'
    }
]

// eslint-disable-next-line react/prop-types
export default function VoiceOverLibrary({ handleClose }) {
    const [playing, setPlaying] = useState({
        isPlaying: false,
        link: ''
    });
    const [audio] = useState(new Audio());
    const setVoiceoverModel = settings((state) => state.setVoiceoverModel);

    const playMusic = (music) => {
        if (music) {
            audio.src = music;
            audio.play();
            setPlaying({ isPlaying: true, link: music });
        }
    };

    const pauseMusic = () => {
        audio.pause();
        setPlaying({ isPlaying: false, link: '' });
    };

    useEffect(() => {
        // Cleanup previous audio when the component unmounts or when music changes
        return () => {
            audio.pause();
            setPlaying({ isPlaying: false, link: '' });
            audio.src = '';
        };
    }, [audio]);

    return (
        <div>
            <div className='px-2 pt-10 bg-primary-light dark:bg-primary-dark md:px-4 py-3 flex flex-col gap-y-5 gap-x-6 overflow-y-scroll h-[84vh]'>
                {voices.map((voice, index) => (
                    <div key={index} className='h-fit group'>
                        <div className='flex h-fit items-center gap-x-2 opacity-70 group-hover:opacity-90 transition-opacity duration-200'>
                            <button type='button' onClick={() => {
                                if (playing.isPlaying === true && playing.link === voice.preview) {
                                    pauseMusic();
                                } else {
                                    playMusic(voice.preview);
                                }
                            }}>
                                {(playing.link === voice.preview && playing.isPlaying === true) ? <MdStopCircle size={18} /> : <HiMiniSpeakerWave size={18} />}
                            </button>
                            <div className='flex gap-1 font-bold'>
                                <button type='button' className='h-fit' onClick={() => {
                                    setVoiceoverModel({ name: voice.name, id: voice.id });
                                    handleClose();
                                }}>
                                    <p className='line-clamp-1 text-[1rem] text-start'>{voice.name}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className='mt-20'>
                    <p className='text-sm text-center opacity-70'>Note: English voices will not work for Hindi script and vice versa.</p>
                </div>
            </div>
        </div>
    )
}
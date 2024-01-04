import { useState, useEffect } from 'react';
import { BiChevronRight, BiSolidDownload, BiSolidImageAlt } from 'react-icons/bi';
import { BsLayersFill, BsMusicNote, BsFillMicFill } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import { FaSave } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CgTranscript } from 'react-icons/cg';
import { MdFullscreenExit, MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { createVideo, downloadVideo } from '../lib/create';
import { getStockMedia } from "../lib/media";
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLayerStore } from '../states/layer';
import { settings } from '../states/settings';
import Modal from './Modal/Modalbig';
import Download from './Modal/Download';
import Settings from './Settings';
import { getProjectById, updateProject } from "../lib/project";

export default function Editor() {
  const { id } = useParams();
  const setLayer = useLayerStore(state => state.setLayer);
  const musicState = settings();
  const bgMusic = settings(state => state.bgMusic);

  const [isPlaying, setIsPlaying] = useState(false);
  const [name, setName] = useState(false);
  const [timeline, setTimeline] = useState(0);
  const [modal, setModal] = useState({
    open: false,
    type: 'media'
  });
  const [downloadModal, setDownloadModal] = useState(false);
  const [activeScript, setActiveScript] = useState(0);
  const [editingIndex, setEditingIndex] = useState(0);
  const [search, setSearch] = useState({
    query: '',
    type: 'video'
  });
  const [script, setScript] = useState([
    {
      dialogue: '',
      image: '',
      type: '',
      download: '',
      height: 'auto'
    }
  ]);

  const handleTimeline = (e) => {
    const value = e.target.value;
    const duration = value / 100 * 42;
    setTimeline(parseInt(duration));
  }

  const addScript = (index) => {
    if (script.length === 15) return toast.error('You cannot add more than 15 scenes');

    const newScript = [...script];
    newScript.splice(index + 1, 0, {
      dialogue: '',
      duration: 0
    });
    setScript(newScript);
  }

  const handleScriptInput = (e, index) => {
    const newScript = [...script];
    newScript[index].dialogue = e.target.value;
    setScript(newScript);
    newScript[index].height = e.target.scrollHeight + 'px';
    setScript(newScript);
  }

  const selectImage = (thumb, download, type) => {
    const newScript = [...script];
    newScript[editingIndex].image = thumb;
    newScript[editingIndex].download = download;
    newScript[editingIndex].type = type;
    setScript(newScript);
  }

  const handleImageSelection = (index) => {
    setEditingIndex(index);
    setModal({ open: true, type: 'media' });
  }

  const deleteScript = (index) => {
    if (script.length === 1) return toast.error('You cannot delete the last scene');
    const newScript = [...script];
    newScript.splice(index, 1);
    setActiveScript(index - 1);
    setScript(newScript);
  }

  const generate = async () => {

    if (!bgMusic.preview) {
      setDownloadModal(false);
      return toast.error('Please select a background music');
    }

    if (script.length < 2) {
      setDownloadModal(false);
      return toast.error('Please add atleast 2 scenes to your script');
    }

    for (const item of script) {
      if (!item.image) {
        setDownloadModal(false);
        return toast.error('Please select a media file for each scene');
      }
      if (!item.dialogue || item.dialogue.length < 5) {
        setDownloadModal(false);
        return toast.error('Please enter a dialogue atleast 5 characters long for each scene');
      }
    }

    toast.promise(
      createVideo(script, bgMusic, musicState, id),
      {
        loading: 'Preparing your video... Hang tight!',
        success: 'Creating your video. You will be emailed when it is ready',
        error: (error) => {
          setDownloadModal(false);
          return error;
        },
        duration: 6000
      }
    );
  }

  const download = async () => {
    setDownloadModal(false);

    toast.promise(
      downloadVideo(id),
      {
        loading: 'Downloading your video...',
        success: 'Video downloaded successfully',
        error: "Error while downloading video, please try again later",
        duration: 2000
      }
    );
  }

  const update = async () => {
    const data = {
      script: script,
      music: musicState.music,
      voiceover: musicState.voiceover,
      bgMusic: musicState.bgMusic,
      subtitlePosition: musicState.subtitlePosition
    };

    toast.promise(
      updateProject(id, data),
      {
        loading: 'Saving your project...',
        success: 'Project saved successfully',
        error: "Error while saving project, please try again later",
        duration: 2000
      }
    );
  }

  const mediaQuery = useQuery({ queryKey: ['stockMedia'], queryFn: () => getStockMedia(search), refetchOnWindowFocus: false });
  const { data, refetch } = useQuery({ queryKey: ['project'], queryFn: () => getProjectById(id) });

  const mutation = (search) => setSearch(search);

  useEffect(() => {
    mediaQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      musicState.setBgMusic({ name: data.bgMusic?.name, preview: data.bgMusic?.preview });
      setScript(data.script);
      musicState.setSubtitlePosition(data.subtitlePosition);
      musicState.setMusicVolume(data.music);
      musicState.setVoiceoverVolume(data.voiceover);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className='pb-4 md:pb-1'>
      {/* Settings tab */}
      <div className='flex justify-center'>
        <div className='w-full flex flex-col md:flex-row justify-between px-6 rounded-xl py-4 bg-secondary-light dark:bg-secondary-dark'>
          <div className='hidden md:flex gap-2 items-center'>
            <Link to='/files' className='flex gap-2 items-center px-[0.45rem] py-[0.3rem] rounded-xl transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-600'>
              <h2>Files</h2>
            </Link>
            <BiChevronRight size={20} />
            <h2>{name ? name : "Filename"}</h2>
          </div>
          <div className='flex gap-2'>
            <button type='button' onClick={() => setDownloadModal(true)} className='flex gap-2 items-center px-3 py-1 text-text-light dark:text-text-dark opacity-70 hover:opacity-100 transition-all duration-200'>
              <BiSolidDownload size={20} />
              <p>Download</p>
            </button>
            <button type='button' onClick={update} className='flex gap-2 items-center px-3 py-1 text-text-light dark:text-text-dark opacity-70 hover:opacity-100 transition-all duration-200'>
              <FaSave size={18} />
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className='grid grid-cols-1 lg:grid-cols-9 md:gap-x-6 mt-5 h-full'>

        {/* Script area */}
        <div className='col-span-3 h-[79vh] md:pr-2 overflow-y-scroll md:pb-12 pb-5 flex flex-col gap-y-5'>

          {/* Background music selection card */}
          <div onClick={() => setLayer("music")} className='rounded-xl'>

            <div className='bg-secondary-light flex justify-between items-center px-4 rounded-t-xl py-1 dark:bg-secondary-dark border-t border-x border-border-light dark:border-border-dark'>
              <p className='text-size-sm lg:text-size-base opacity-[0.7]'>Audio</p>
              <div className='flex gap-2 opacity-70 items-center'>
                <BsLayersFill size={15} />
                <p className='text-size-sm lg:text-size-base'>Layer</p>
              </div>
            </div>

            <div className='p-4 overflow-x-hidden hover:border-opacity-70 hover:dark:border-opacity-70 transition-all duration-200 border border-border-light dark:border-border-dark hover:border-rose-500 hover:dark:border-rose-500 rounded-b-2xl group'>
              <div className='flex text-[0.875rem] items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <BsMusicNote size={15} />
                  <p className='text-text-light dark:text-text-dark opacity-70'>Background Music</p>
                </div>
                <button type='button' onClick={() => musicState.setBgMusic({ name: '', preview: '' })} className='text-xs cursor-pointer invisible hover:opacity-100 transition-opacity duration-200 group-hover:visible opacity-70'>delete</button>
              </div>
              <div className='flex items-center mt-2'>
                <button type='button' onClick={() => setModal({ open: true, type: 'music' })} className='px-[0.6rem] py-[0.2rem] rounded-2xl text-xs cursor-pointer border border-text-light dark:border-text-dark opacity-70 hover:opacity-100'>
                  <p className="">{bgMusic.name ? bgMusic.name.substring(0, 30) : 'Choose audio'}</p>
                </button>
              </div>
            </div>

          </div>

          {/* Voice over selection card */}
          <div className='rounded-xl'>
            <div className='bg-secondary-light flex justify-between items-center px-4 rounded-t-xl py-1 dark:bg-secondary-dark border-t border-x border-border-light dark:border-border-dark'>
              <p className='text-size-sm lg:text-size-base opacity-[0.7]'>Voice Over</p>
              <div className='flex gap-2 opacity-70 items-center'>
                <BsLayersFill size={15} />
                <p className='text-size-sm lg:text-size-base'>Layer</p>
              </div>
            </div>
            <div className='p-4 overflow-x-hidden hover:border-opacity-70 hover:dark:border-opacity-70 transition-all duration-200 border border-border-light dark:border-border-dark hover:border-rose-500 hover:dark:border-rose-500 rounded-b-2xl group'>
              <div className='flex text-[0.875rem] items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <BsFillMicFill size={15} />
                  <p className='text-text-light dark:text-text-dark opacity-70'>Your Voiceover</p>
                </div>
                <div className='text-xs cursor-pointer invisible hover:opacity-100 transition-opacity duration-200 group-hover:visible opacity-70'>delete</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className='px-[0.6rem] py-[0.2rem] rounded-2xl text-xs cursor-pointer border border-text-light dark:border-text-dark opacity-70 hover:opacity-100'>
                  <p>Tony</p>
                </div>
              </div>
            </div>
          </div>

          {script.map((item, index) => (
            <div key={index} onClick={() => {
              setLayer("script");
              setActiveScript(index);
            }} className='rounded-xl'>
              <div className='bg-secondary-light flex justify-between items-center px-4 rounded-t-xl py-1 dark:bg-secondary-dark border-t border-x border-border-light dark:border-border-dark'>
                <p className='text-size-sm lg:text-size-base opacity-[0.7]'>Scene {index + 1}</p>
                <div className='flex gap-2 opacity-70 items-center'>
                  <BsLayersFill size={15} />
                  <p className='text-size-sm lg:text-size-base'>Layer</p>
                </div>
              </div>
              <div className='p-4 overflow-x-hidden transition-all duration-200 hover:border-opacity-70 hover:dark:border-opacity-70 border border-border-light dark:border-border-dark border-opacity-70 hover:border-rose-500 hover:dark:border-rose-500 group'>
                <div className='flex text-[0.875rem] items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <CgTranscript size={15} />
                    <p className='text-text-light dark:text-text-dark opacity-70'>Script</p>
                  </div>
                  <div className='text-xs cursor-pointer invisible hover:opacity-100 transition-opacity duration-200 group-hover:visible opacity-70'>
                    <button onClick={() => deleteScript(index)}>
                      delete
                    </button>
                  </div>
                </div>
                <div className='flex items-center mt-2'>
                  <div className='px-[0.6rem] py-[0.2rem] w-full flex cursor-text rounded-lg text-base border border-text-light dark:border-text-dark border-opacity-70 dark:border-opacity-30 hover:border-opacity-100 hover:dark:border-opacity-70'>
                    <textarea required minLength={5} className='text-text-light resize-none overflow-y-hidden w-full bg-transparent dark:text-text-dark outline-0 overflow-x-hidden' style={{ height: item.height }} rows={1} onChange={(e) => handleScriptInput(e, index)} value={item.dialogue} />
                  </div>
                </div>
              </div>
              <div className='p-4 overflow-x-hidden transition-all hover:border-opacity-70 hover:dark:border-opacity-70 duration-200 border border-border-light dark:border-border-dark hover:border-rose-500 hover:dark:border-rose-500 rounded-b-2xl group'>
                <div className='flex text-[0.875rem] items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <RiLayoutMasonryFill size={15} />
                    <p className='text-text-light dark:text-text-dark opacity-70'>Layout</p>
                  </div>
                </div>
                <div className='flex items-center mt-2'>
                  <div className='rounded-md flex items-center justify-center bg-neutral-200 dark:bg-neutral-600 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <button type='button' onClick={() => handleImageSelection(index)}>
                      {item.image ? <img src={item.image} alt='Scene pic' className='rounded-md h-[3.125rem] w-[3.125rem]' /> : <BiSolidImageAlt size={50} className='text-text2-light dark:text-text-light' />}
                    </button>
                  </div>
                </div>
              </div>

              <div className='w-full flex justify-center mt-2'>
                <button onClick={() => addScript(index)} className='opacity-30 transition-all duration-200 cursor-pointer hover:text-rose-500 hover:opacity-70'>
                  <AiOutlinePlusCircle size={30} />
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* Player area */}
        <div className='w-full col-span-4 flex flex-col items-center pb-5 md:pb-0'>
          <div className='aspect-[9/16] max-h-[31.15rem] w-full max-w-[17.5218rem] bg-neutral-700 rounded-xl border border-border-light dark:border-border-dark'>
            {script[activeScript]?.image && <img src={script[activeScript]?.image} alt='Scene pic' className='rounded-xl h-full w-full object-cover' />}
          </div>

          {/* Player controls */}
          <div className='w-full bg-secondary-light dark:bg-secondary-dark max-w-[24.7837rem] px-4 py-2 rounded-xl mt-3 border border-border-light dark:border-border-dark'>
            <div className='flex items-center justify-center gap-5'>
              <div className='flex items-center justify-center gap-2'>
                <button type='button' onClick={() => {
                  setIsPlaying(!isPlaying);
                  toast.info("This feature is not available yet.");
                }} className='active:opacity-80 hover:text-rose-500 transition-all duration-200'>
                  {isPlaying ? <MdPauseCircleFilled size={35} /> : <MdPlayCircleFilled size={35} />}
                </button>
                <button type='button' onClick={() => {
                  setIsPlaying(!isPlaying);
                  toast.info("This feature is not available yet.");
                }} className='active:opacity-80 hover:text-rose-500 transition-all duration-200'>
                  <VscDebugRestart size={20} />
                </button>
                <button type='button' className='active:opacity-80 hover:text-rose-500 transition-all duration-200'>
                  <MdFullscreenExit size={20} />
                </button>
              </div>
              <div>
                <p className='text-sm text-text-light dark:text-text-dark opacity-70'>00:{timeline < 10 ? "0" + timeline : timeline} / 00:42</p>
              </div>
            </div>
            <input type="range" onChange={handleTimeline} className="w-full h-2 bg-neutral-400 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700" />
          </div>

        </div>

        {/* Settings area */}
        <Settings />

      </div>

      {modal.open && <Modal
        handleClose={() => setModal({ open: false, type: 'media' })}
        selectImage={selectImage}
        type={modal.type}
        mediaQuery={mediaQuery}
        mutation={mutation}
      />}
      {downloadModal && <Download
        handleClose={() => setDownloadModal(false)}
        createdAt={data.createdAt}
        generate={generate}
        download={download}
        refetch={refetch}
        exported={data.isGenerated} />}
    </div>
  )
}

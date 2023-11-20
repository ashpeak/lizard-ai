import React, { useState, useEffect } from 'react';
import { BiChevronRight, BiSolidDownload, BiSolidImageAlt } from 'react-icons/bi';
import { BsLayersFill, BsMusicNote, BsFillMicFill } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import { FaMagic } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CgTranscript } from 'react-icons/cg';
import { MdFullscreen, MdFullscreenExit, MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Modal from './Modal/Modalbig';
import { Toaster, toast } from 'sonner';
import createVideo from '../lib/create';
import { uploadImage } from '../lib/create';
import { getImages } from "../lib/user";

export default function Editor() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timeline, setTimeline] = useState(0);
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(0);
  const [script, setScript] = useState([
    {
      text: '',
      duration: 0,
      image: '',
      height: 'auto'
    }
  ]);

  const handleTimeline = (e) => {
    const value = e.target.value;
    const duration = value / 100 * 42;
    setTimeline(parseInt(duration));
  }

  const handleImage = async (e) => {
    const image = e.target.files[0];
    toast.promise(
      uploadImage(image),
      {
        loading: 'Uploading image...',
        success: (res) => {
          setImages([...images, res]);
          return 'Image uploaded successfully';
        },
        error: 'Error while uploading image',
      }
    );
  }

  const addScript = (index) => {
    const newScript = [...script];
    newScript.splice(index + 1, 0, {
      text: '',
      duration: 0
    });
    setScript(newScript);
  }

  const handleScriptInput = (e, index) => {
    const newScript = [...script];
    newScript[index].text = e.target.value;
    setScript(newScript);
    newScript[index].height = e.target.scrollHeight + 'px';
    setScript(newScript);
  }

  const selectImage = (image) => {
    const newScript = [...script];
    newScript[editingIndex].image = image;
    setScript(newScript);
  }

  const handleImageSelection = (index) => {
    setEditingIndex(index);
    setModal(true);
  }

  const deleteScript = (index) => {
    if (script.length === 1) return toast.success('You cannot delete the last scene');
    const newScript = [...script];
    newScript.splice(index, 1);
    setScript(newScript);
  }

  useEffect(() => {
    setTimeout(() => {
      getImages().then(res => {
        setImages(res);
      });
    }, 7000);
  }, []);

  return (
    <div>
      {/* Settings tab */}
      <div className='flex justify-center'>
        <div className='w-full flex flex-col md:flex-row justify-between px-6 rounded-xl py-4 bg-secondary-light dark:bg-secondary-dark'>
          <div className='flex gap-2 items-center'>
            <Link to='/files' className='flex gap-2 items-center px-[0.45rem] py-[0.3rem] rounded-xl transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-600'>
              <h2>Editor</h2>
            </Link>
            <BiChevronRight size={20} />
            <h2>Filename</h2>
          </div>
          <div className='flex gap-2'>
            <button type='button' onClick={() => setModal(true)} className='flex gap-2 items-center px-3 py-1 rounded-2xl bg-rose-500 text-white hover:bg-rose-600 transition-all duration-200'>
              <FaMagic size={20} />
              <p>Ai create</p>
            </button>
            <button type='button' onClick={() => createVideo(script)} className='flex gap-2 items-center px-3 py-1 text-text-light dark:text-text-dark opacity-70 hover:opacity-100 transition-all duration-200'>
              <BiSolidDownload size={20} />
              <p>Download</p>
            </button>
            <button type='button' className='flex gap-2 items-center px-3 py-1 text-text-light dark:text-text-dark opacity-70 hover:opacity-100 transition-all duration-200'>
              <IoSettingsSharp size={20} />
              <p>Settings</p>
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className='grid grid-cols-1 lg:grid-cols-9 md:gap-x-6 mt-5 h-full'>

        {/* Script area */}
        <div className='col-span-3 h-[79vh] md:pr-2 overflow-y-scroll md:pb-12 pb-5 flex flex-col gap-y-5'>

          <div className='rounded-xl'>
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
                <div className='text-xs cursor-pointer invisible hover:opacity-100 transition-opacity duration-200 group-hover:visible opacity-70'>delete</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className='px-[0.6rem] py-[0.2rem] rounded-2xl text-xs cursor-pointer border border-text-light dark:border-text-dark opacity-70 hover:opacity-100'>
                  <p className="">Beautiful Morning</p>
                </div>
              </div>
            </div>
          </div>
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
            <div className='rounded-xl'>
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
                    <textarea className='text-text-light resize-none overflow-y-hidden w-full bg-transparent dark:text-text-dark outline-0 overflow-x-hidden' style={{ height: item.height }} rows={1} onChange={(e) => handleScriptInput(e, index)} value={item.text} />
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
          <div className='aspect-[9/16] max-h-[31.15rem] w-full max-w-[17.5218rem] bg-neutral-700 rounded-xl border border-border-light dark:border-border-dark'></div>

          {/* Player controls */}
          <div className='w-full bg-secondary-light dark:bg-secondary-dark max-w-[24.7837rem] px-4 py-2 rounded-xl mt-3 border border-border-light dark:border-border-dark'>
            <div className='flex items-center justify-center gap-5'>
              <div className='flex items-center justify-center gap-2'>
                <button type='button' onClick={() => setIsPlaying(!isPlaying)} className='active:opacity-80 hover:text-rose-500 transition-all duration-200'>
                  {isPlaying ? <MdPauseCircleFilled size={35} /> : <MdPlayCircleFilled size={35} />}
                </button>
                <button type='button' onClick={() => setIsPlaying(!isPlaying)} className='active:opacity-80 hover:text-rose-500 transition-all duration-200'>
                  <VscDebugRestart size={20} />
                </button>
                <button type='button' onClick={() => setIsFullScreen(!isFullScreen)} className='active:opacity-80 hover:text-rose-500 transition-all duration-200'>
                  {isFullScreen ? <MdFullscreenExit size={20} /> : <MdFullscreen size={20} />}
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
        <div className='rounded-xl col-span-2 border border-border-light dark:border-border-dark h-full'>

        </div>

      </div>

      <Toaster richColors position="bottom-right" />
      {modal && <Modal handleClose={() => setModal(false)} selectImage={selectImage} images={images} handleImage={handleImage} />}
    </div>
  )
}

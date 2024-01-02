import { useLayerStore } from '../states/layer';
import Mixer from './MusicMix';
import ScriptSettings from './ScriptSettings';

export default function Settings() {

    const layer = useLayerStore(state => state.layer);

    return (
        <div className='rounded-xl col-span-2 border border-border-light dark:border-border-dark h-full'>
            {layer === "music" && <Mixer />}
            {layer === "script" && <ScriptSettings />}
            {layer === null && <p className='text-text-light p-4 dark:text-text-dark opacity-80'>Select a layer to make customizations.</p>}
        </div>
    )
}

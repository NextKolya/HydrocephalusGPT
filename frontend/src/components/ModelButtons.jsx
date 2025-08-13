import { useState, useEffect, useRef } from 'react';

import sidebar from './styles/Sidebar.module.css';

const modelButtons = [
    { name: 'HydrocephalusGPT', iconWidth: '17.25px', iconHeight: '17.25px' },
    { name: 'Designer', iconWidth: '20.25px', iconHeight: '19.5px' },
    { name: 'Vacation Planner', iconWidth: '24.01px', iconHeight: '15.75px' },
    { name: 'Cooking Assistant', iconWidth: '20.25px', iconHeight: '19.5px' },
];

export default function ModelButtons() {
    const [currentModel, setCurrentModel] = useState('HydrocephalusGPT');

    const modelButtonsRef = useRef({});
    const sidelineRef = useRef();

    useEffect(() => {
        const currentModelButton = modelButtonsRef.current[currentModel];
        if (sidelineRef.current) {
            sidelineRef.current.style.top = `${currentModelButton.offsetTop}px`;
        }
    }, [currentModel]);

    return (
        <div className={sidebar['model-container']}>
            <div className={sidebar['model-title']}>
                <span>Hydrocephalus GPT</span>
            </div>
            <div className={sidebar['model-buttons']}>
                {modelButtons.map((modelButton) => (
                    <button
                        className={`${sidebar['model-button']} ${
                            currentModel === modelButton.name
                                ? sidebar['model-button-active']
                                : ''
                        }`}
                        key={modelButton.name}
                        ref={(element) =>
                            (modelButtonsRef.current[modelButton.name] =
                                element)
                        }
                        onClick={() => setCurrentModel(modelButton.name)}
                    >
                        <img
                            src={`/${modelButton.name}-icon.svg`}
                            alt=''
                            style={{
                                width: modelButton.iconWidth,
                                height: modelButton.iconHeight,
                            }}
                        />
                        <span>{modelButton.name}</span>
                    </button>
                ))}
                <div ref={sidelineRef} className={sidebar['active-sideline']} />
            </div>
        </div>
    );
}

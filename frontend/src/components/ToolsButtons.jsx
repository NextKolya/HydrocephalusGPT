import { useState, useEffect, useRef } from 'react';

import useSidebarStore from '../SidebarStore';

import sidebar from './styles/Sidebar.module.css';

const toolsButtons = ['Model', 'Profile', 'Payment'];

export default function ToolsButtons() {
    const { currentTool, setCurrentTool } = useSidebarStore();

    const toolButtonsRef = useRef({});
    const underlineRef = useRef();

    useEffect(() => {
        const currentToolButton = toolButtonsRef.current[currentTool];
        if (underlineRef.current) {
            underlineRef.current.style.width = `${currentToolButton.offsetWidth}px`;
            underlineRef.current.style.left = `${currentToolButton.offsetLeft}px`;
        }
    }, [currentTool]);

    return (
        <div className={sidebar['tools-buttons']}>
            {toolsButtons.map((toolButton) => (
                <button
                    key={toolButton}
                    ref={(element) =>
                        (toolButtonsRef.current[toolButton] = element)
                    }
                    onClick={() => setCurrentTool(toolButton)}
                    className={
                        currentTool === toolButton
                            ? sidebar['active-button']
                            : ''
                    }
                >
                    {toolButton}
                </button>
            ))}
            <div ref={underlineRef} className={sidebar['active-underline']} />
        </div>
    );
}

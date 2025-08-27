import { useEffect, useRef } from 'react';

import sidebar from './styles/Sidebar.module.css';

const toolsButtons = ['Model', 'Profile', 'Payment'];

type ToolsButtonsProps = {
    currentTool: string;
    setCurrentTool: (tool: string) => void;
};
export default function ToolsButtons({
    currentTool,
    setCurrentTool,
}: ToolsButtonsProps) {
    const toolButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({});
    const underlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!toolButtonsRef || !underlineRef.current) return;
        const currentToolButton = toolButtonsRef.current[currentTool];

        if (currentToolButton) {
            underlineRef.current.style.width = `${currentToolButton.offsetWidth}px`;
            underlineRef.current.style.left = `${currentToolButton.offsetLeft}px`;
        }
    }, [currentTool]);

    return (
        <div className={sidebar['tools-buttons']}>
            {toolsButtons.map((toolButton) => (
                <button
                    key={toolButton}
                    ref={(element) => {
                        toolButtonsRef.current[toolButton] = element;
                    }}
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

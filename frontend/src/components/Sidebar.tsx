import { useState } from 'react';

import ToolsButtons from './ToolsButtons';

// @ts-ignore

import ModelButtons from './ModelButtons';

// @ts-ignore

import RecentChats from './RecentChats';

import sidebar from './styles/Sidebar.module.css';

export default function Sidebar() {
    const [currentTool, setCurrentTool] = useState('Model');

    return (
        <div className={sidebar.sidebar}>
            <div className={sidebar['profile-container']}>
                <div className={sidebar['profile-description']}>
                    <div className={sidebar.avatar}>
                        <img src='/default-avatar.png' alt='avatar' />
                        <img src='/avatar-online.svg' alt='online' />
                    </div>

                    <div className={sidebar['description-container']}>
                        <span>user</span>
                        <span>Infinity Tokens Left</span>
                    </div>
                </div>
            </div>

            <div className={sidebar.tools}>
                <ToolsButtons
                    currentTool={currentTool}
                    setCurrentTool={setCurrentTool}
                />

                <div className={sidebar['tool-content']}>
                    {currentTool === 'Model' ? <ModelButtons /> : ''}
                </div>
            </div>

            <RecentChats />
        </div>
    );
}

import useSidebarStore from '../SidebarStore';
import ToolsButtons from './ToolsButtons';

import ModelButtons from './ModelButtons';
import RecentChats from './RecentChats';

import sidebar from './styles/Sidebar.module.css';

export default function Sidebar() {
    const { currentTool } = useSidebarStore();

    return (
        <div className={sidebar.sidebar}>
            <div className={sidebar['profile-container']}>
                <div className={sidebar['profile-description']}>
                    <div className={sidebar.avatar}>
                        <img src='/default-avatar.png' alt='avatar' />
                        <img src='/avatar-online.svg' alt='online' />
                    </div>

                    <div className={sidebar['description-container']}>
                        <span>k85</span>
                        <span>205 Tokens Left</span>
                    </div>
                </div>
            </div>

            <div className={sidebar.tools}>
                <ToolsButtons />

                <div className={sidebar['tool-content']}>
                    {currentTool === 'Model' ? <ModelButtons /> : ''}
                </div>
            </div>

            <RecentChats />
        </div>
    );
}

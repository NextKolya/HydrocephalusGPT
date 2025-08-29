import { useState, useEffect, useRef } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import useChatStore from '../stores/ChatStore';
import { Chat } from '../stores/chatStore.types';

import { calcTimeAgo } from '../utils/formatTime';

import { motion } from 'framer-motion';
import recentChats from './styles/RecentChats.module.css';

const editChatIcons = [
    { name: 'edit', iconWidth: '19.5px', iconHeight: '19.5px' },
    { name: 'delete', iconWidth: '18.75px', iconHeight: '20.63px' },
    { name: 'chat-settings', iconWidth: '20.25px', iconHeight: '5.25px' },
];

type RecentChatButtonProps = {
    chat: Chat;
    setButtonRef: (el: HTMLDivElement | null) => void;
};
export default function RecentChatButton({
    chat,
    setButtonRef,
}: RecentChatButtonProps) {
    const currentChatId = useChatStore((state) => state.currentChatId);
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);

    const deleteChat = useChatStore((state) => state.deleteChat);

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const editChatTitle = useChatStore((state) => state.editChatTitle);
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();
    function editChatFunctions(funcName: string) {
        if (!currentChatId) return;
        if (funcName === 'edit') {
            setIsEditing(true);
        } else if (funcName === 'delete') {
            deleteChat(currentChatId);

            navigate('/chat');
        }
    }

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditing]);

    const currentDate: Date = new Date();

    return (
        <NavLink to={`/chat/${chat.id}`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className={`${recentChats['recent-chat']} ${
                    currentChatId === chat?.id
                        ? recentChats['recent-chat-active']
                        : ''
                }`}
                onClick={() => setCurrentChat(chat)}
                ref={setButtonRef}
            >
                {isEditing && currentChatId === chat.id ? (
                    <input
                        type='text'
                        ref={titleInputRef}
                        className={recentChats['recent-chat-title']}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={() => {
                            editChatTitle(currentChatId, newTitle);
                            setIsEditing(false);
                            setNewTitle('');
                        }}
                    />
                ) : (
                    <span className={recentChats['recent-chat-title']}>
                        {chat?.title}
                    </span>
                )}
                {currentChatId === chat?.id ? (
                    <motion.div
                        className={recentChats['edit-chat-icons']}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        {editChatIcons.map((editChatIcon) => (
                            <img
                                key={editChatIcon.name}
                                src={`/${editChatIcon.name}-icon.svg`}
                                alt={editChatIcon.name}
                                style={{
                                    width: editChatIcon.iconWidth,
                                    height: editChatIcon.iconHeight,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    editChatFunctions(editChatIcon.name);
                                }}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <span className={recentChats['recent-chat-time']}>
                        {calcTimeAgo(
                            currentDate,
                            chat.messages.at(-1)?.messageTime
                        ) || 'now'}
                    </span>
                )}
            </motion.div>
        </NavLink>
    );
}

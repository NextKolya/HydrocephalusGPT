import { useEffect, useState, useRef } from 'react';

import useChatStore from '../stores/ChatStore';

import { ChatStore } from '../stores/chatStore.types';

import { calcTimeAgo } from '../utils/formatTime';

import { AnimatePresence, motion } from 'framer-motion';
import recentChats from './styles/RecentChats.module.css';

const editChatIcons = [
    { name: 'edit', iconWidth: '19.5px', iconHeight: '19.5px' },
    { name: 'delete', iconWidth: '18.75px', iconHeight: '20.63px' },
    { name: 'chat-settings', iconWidth: '20.25px', iconHeight: '5.25px' },
];

type RecentChatsListProps = Pick<
    ChatStore,
    'currentChatId' | 'setCurrentChat' | 'chats'
>;

export default function RecentChatsList({
    chats,
    currentChatId,
    setCurrentChat,
}: RecentChatsListProps) {
    const sidelineRef = useRef<HTMLDivElement | null>(null);
    const recentButtonsRef = useRef<Record<string, HTMLButtonElement | null>>(
        {}
    );

    useEffect(() => {
        if (!currentChatId) return;
        const recentChatButton = recentButtonsRef.current[currentChatId];

        if (sidelineRef.current) {
            if (recentChatButton && chats.length) {
                sidelineRef.current.style.height = `${recentChatButton.offsetHeight}px`;
                sidelineRef.current.style.top = `${recentChatButton.offsetTop}px`;
            } else {
                sidelineRef.current.style.height = '0';
            }
        }
    }, [currentChatId, chats]);

    const deleteChat = useChatStore((state) => state.deleteChat);

    const [newTitle, setNewTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const editChatTitle = useChatStore((state) => state.editChatTitle);
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    function editChatFunctions(funcName: string) {
        if (!currentChatId) return;
        if (funcName === 'edit') {
            setIsEditing(true);
        } else if (funcName === 'delete') {
            deleteChat(currentChatId);
        }
    }

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditing]);

    const currentDate: Date = new Date();

    return (
        <motion.div
            className={recentChats['recent-chats-container']}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
        >
            <AnimatePresence>
                {chats.map((chat) => (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className={`${recentChats['recent-chat']} ${
                            currentChatId === chat?.id
                                ? recentChats['recent-chat-active']
                                : ''
                        }`}
                        key={chat.id}
                        onClick={() => setCurrentChat(chat)}
                        ref={(element) => {
                            recentButtonsRef.current[chat.id] = element;
                        }}
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
                                        onClick={() =>
                                            editChatFunctions(editChatIcon.name)
                                        }
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
                    </motion.button>
                ))}
            </AnimatePresence>
            <div
                className={recentChats['active-sideline']}
                ref={sidelineRef}
            ></div>
        </motion.div>
    );
}

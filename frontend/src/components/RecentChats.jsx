import { useState, useEffect, useRef } from 'react';

import useChatStore from '../ChatStore';

import { AnimatePresence, motion } from 'framer-motion';
import recentChats from './styles/RecentChats.module.css';

const editChatIcons = [
    { name: 'edit', iconWidth: '19.5px', iconHeight: '19.5px' },
    { name: 'delete', iconWidth: '18.75px', iconHeight: '20.63px' },
    { name: 'chat-settings', iconWidth: '20.25px', iconHeight: '5.25px' },
];

export default function RecentChats() {
    const chats = useChatStore((state) => state.chats);

    const currentChatId = useChatStore((state) => state.currentChatId);
    const currentChat = chats.find((chat) => chat.id === currentChatId);
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);

    const [showChats, setShowChats] = useState(true);

    const sidelineRef = useRef(null);
    const recentButtonsRef = useRef({});

    useEffect(() => {
        const recentChatButton = recentButtonsRef.current[currentChat?.id];

        if (sidelineRef.current) {
            if (recentChatButton && chats.length) {
                sidelineRef.current.style.height = `${recentChatButton.offsetHeight}px`;
                sidelineRef.current.style.top = `${recentChatButton.offsetTop}px`;
            } else {
                sidelineRef.current.style.height = '0';
            }
        }
        // console.log(currentChat);
    }, [currentChat, chats]);

    const createChat = useChatStore((state) => state.createChat);
    const deleteChat = useChatStore((state) => state.deleteChat);

    const [newTitle, setNewTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const editChatTitle = useChatStore((state) => state.editChatTitle);
    const titleInputRef = useRef(null);

    function editChatFunctions(funcName) {
        if (funcName === 'edit') {
            setIsEditing(true);
        } else if (funcName === 'delete') {
            deleteChat(currentChat.id);
        }
    }

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditing]);

    const showChatsRef = useRef(null);
    useEffect(() => {
        if (showChatsRef.current) {
            if (showChats) {
                showChatsRef.current.style.transform = `rotate(180deg)`;
            } else {
                showChatsRef.current.style.transform = '';
            }
        }
    }, [showChats]);

    return (
        <div className={recentChats['recent-chats']}>
            <div className={recentChats['title-block']}>
                <span>Recent Chats</span>
                <div>
                    <img
                        src='plus-icon.svg'
                        alt='add new chat'
                        onClick={() => {
                            const newChat = {
                                title: `New Chat ${
                                    chats.length >= 1 ? `(${chats.length})` : ''
                                }`,
                                id: crypto.randomUUID(),
                                messages: [],
                            };
                            if (chats.length >= 3) return;
                            if (showChats) {
                                createChat(newChat);
                            }
                            setCurrentChat(newChat);
                        }}
                    />
                    <img
                        ref={showChatsRef}
                        src='/accordion-icon.svg'
                        alt=''
                        onClick={() => setShowChats((prev) => !prev)}
                    />
                </div>
            </div>

            <AnimatePresence>
                {showChats && (
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
                                        currentChat?.id === chat?.id
                                            ? recentChats['recent-chat-active']
                                            : ''
                                    }`}
                                    key={chat.id}
                                    onClick={() => setCurrentChat(chat)}
                                    ref={(element) =>
                                        (recentButtonsRef.current[chat.id] =
                                            element)
                                    }
                                >
                                    {isEditing && currentChatId === chat.id ? (
                                        <input
                                            type='text'
                                            ref={titleInputRef}
                                            className={
                                                recentChats['recent-chat-title']
                                            }
                                            onChange={(e) =>
                                                setNewTitle(e.target.value)
                                            }
                                            onBlur={() => {
                                                editChatTitle(
                                                    currentChat.id,
                                                    newTitle
                                                );
                                                setIsEditing(false);
                                                setNewTitle('');
                                            }}
                                        />
                                    ) : (
                                        <span
                                            className={
                                                recentChats['recent-chat-title']
                                            }
                                        >
                                            {chat?.title}
                                        </span>
                                    )}
                                    {currentChat?.id === chat?.id ? (
                                        <motion.div
                                            className={
                                                recentChats['edit-chat-icons']
                                            }
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.1 }}
                                        >
                                            {editChatIcons.map(
                                                (editChatIcon) => (
                                                    <img
                                                        key={editChatIcon.name}
                                                        src={`/${editChatIcon.name}-icon.svg`}
                                                        alt={editChatIcon.name}
                                                        style={{
                                                            width: editChatIcon.iconWidth,
                                                            height: editChatIcon.iconHeight,
                                                        }}
                                                        onClick={() =>
                                                            editChatFunctions(
                                                                editChatIcon.name
                                                            )
                                                        }
                                                    />
                                                )
                                            )}
                                        </motion.div>
                                    ) : (
                                        <span
                                            className={
                                                recentChats['recent-chat-time']
                                            }
                                        >
                                            2m ago
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
                )}
            </AnimatePresence>
        </div>
    );
}

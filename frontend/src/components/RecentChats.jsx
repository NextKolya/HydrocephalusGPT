import { useState, useEffect, useRef } from 'react';

import useChatStore from '../stores/ChatStore';

import RecentChatsList from './RecentChatsList';

import { AnimatePresence, motion } from 'framer-motion';
import recentChats from './styles/RecentChats.module.css';

export default function RecentChats() {
    const chats = useChatStore((state) => state.chats);

    const currentChatId = useChatStore((state) => state.currentChatId);
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);

    const [showChats, setShowChats] = useState(true);

    const createChat = useChatStore((state) => state.createChat);

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
                    <RecentChatsList
                        chats={chats}
                        currentChatId={currentChatId}
                        setCurrentChat={setCurrentChat}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

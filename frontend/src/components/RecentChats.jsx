import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useChatStore from '../stores/ChatStore';

import RecentChatsList from './RecentChatsList';

import { AnimatePresence } from 'framer-motion';
import recentChats from './styles/RecentChats.module.css';

export default function RecentChats() {
    const chats = useChatStore((state) => state.chats);

    const currentChatId = useChatStore((state) => state.currentChatId);
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);

    const [showChats, setShowChats] = useState(true);

    const createChat = useChatStore((state) => state.createChat);
    const navigate = useNavigate();

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
                        src='/plus-icon.svg'
                        alt='add new chat'
                        onClick={() => {
                            const newChat = {
                                id: crypto.randomUUID(),
                                title: `New Chat ${
                                    chats.length >= 1 ? `(${chats.length})` : ''
                                }`,
                                messages: [],
                            };
                            if (chats.length >= 3) return;
                            if (showChats) {
                                createChat(newChat);
                                setCurrentChat(newChat);
                                navigate(`/chat/${newChat.id}`);
                            }
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

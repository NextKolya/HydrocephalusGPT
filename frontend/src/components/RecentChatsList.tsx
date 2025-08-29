import React, { useEffect, useRef } from 'react';

import useChatStore from '../stores/ChatStore';

import { ChatStore } from '../stores/chatStore.types';

import RecentChatButton from './RecentChatButton';

import { AnimatePresence, motion } from 'framer-motion';

import recentChats from './styles/RecentChats.module.css';

type RecentChatsListProps = Pick<ChatStore, 'chats'>;

export default React.memo(function RecentChatsList({
    chats,
}: RecentChatsListProps) {
    const currentChatId = useChatStore((state) => state.currentChatId);

    const sidelineRef = useRef<HTMLDivElement | null>(null);
    const recentButtonsRef = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        if (!sidelineRef.current) return;
        if (currentChatId && chats.length) {
            const recentChatButton = recentButtonsRef.current[currentChatId];
            if (recentChatButton) {
                sidelineRef.current.style.height = `${recentChatButton.offsetHeight}px`;
                sidelineRef.current.style.top = `${recentChatButton.offsetTop}px`;
            }
        } else {
            sidelineRef.current.style.height = '0';
        }
    }, [currentChatId, chats.length]);

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
                    <RecentChatButton
                        key={chat.id}
                        chat={chat}
                        setButtonRef={(element) => {
                            recentButtonsRef.current[chat.id] = element;
                        }}
                    />
                ))}
            </AnimatePresence>
            <div
                className={recentChats['active-sideline']}
                ref={sidelineRef}
            ></div>
        </motion.div>
    );
});

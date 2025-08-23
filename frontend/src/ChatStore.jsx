import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChatStore = create(
    persist(
        (set) => ({
            chats: [
                //* TEST chat
                // { id: crypto.randomUUID(), title: 'test chat', messages: [] }
            ],
            createChat: (newChat) => {
                set((state) => {
                    return {
                        chats: [...state.chats, newChat],
                        currentChatId: newChat.id,
                    };
                });
            },
            deleteChat: (chatId) => {
                set((state) => ({
                    chats: state.chats.filter((chat) => chatId !== chat.id),
                }));
            },
            editChatTitle: (chatId, newTitle) => {
                set((state) => ({
                    chats: state.chats.map((chat) =>
                        chat.id === chatId ? { ...chat, title: newTitle } : chat
                    ),
                }));
            },

            currentChatId: null,
            setCurrentChat: (chat) => {
                set(() => ({ currentChatId: chat.id }));
            },
            addMessage: (chatId, message) => {
                set((state) => ({
                    chats: state.chats.map((chat) =>
                        chat.id === chatId
                            ? {
                                  ...chat,
                                  messages: [
                                      ...chat.messages,
                                      {
                                          ...message,
                                      },
                                  ],
                              }
                            : chat
                    ),
                }));
            },
            currentMessage: null,
            setCurrentMessage: (message) => {
                set(() => ({ currentMessage: message ?? null }));
            },
            updateAnswer: (chatId, newAnswerContent) => {
                set((state) => {
                    if (!state.currentMessage) return;

                    return {
                        chats: state.chats.map((chat) =>
                            chat.id === chatId
                                ? {
                                      ...chat,
                                      messages: chat.messages.map((message) =>
                                          message.id === state.currentMessage.id
                                              ? {
                                                    ...message,
                                                    isLoading:
                                                        newAnswerContent.isLoading,
                                                    answer: newAnswerContent.answer,
                                                }
                                              : message
                                      ),
                                  }
                                : chat
                        ),
                        currentMessage: {
                            ...state.currentMessage,
                            answer: newAnswerContent,
                        },
                    };
                });
            },
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({
                chats: state.chats,
            }),
        }
    )
);

export default useChatStore;

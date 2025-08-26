import { useState, useEffect } from 'react';

import header from './styles/Header.module.css';

export default function Header() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);

        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className={header.header}>
            <div className={header['title-block']}>
                <span>Hydrocephalus GPT</span>
            </div>
            <div className={header['theme-block']}>
                <button
                    onClick={() => setTheme('light')}
                    className={
                        theme === 'light' ? header['theme-button-active'] : ''
                    }
                >
                    <img
                        src={
                            theme === 'light'
                                ? '/light-theme-icon-active.svg'
                                : '/light-theme-icon.svg'
                        }
                        alt='light-theme'
                        style={{ width: '22.5px', height: '22.5px' }}
                    />
                </button>

                <button
                    onClick={() => setTheme('dark')}
                    className={
                        theme === 'dark' ? header['theme-button-active'] : ''
                    }
                >
                    <img
                        src={
                            theme === 'dark'
                                ? '/dark-theme-icon-active.svg'
                                : '/dark-theme-icon.svg'
                        }
                        alt='dark-theme'
                        style={{ width: '22.5px', height: '22.5px' }}
                    />
                </button>
            </div>
            <div className={header['tools-block']}>
                <button>
                    <img
                        src='/search-icon.svg'
                        alt='search'
                        style={{ width: '20.27px', height: '20.27px' }}
                    />
                </button>
                {/* <button>
                    <img
                        src='/settings-icon.svg'
                        alt='settings'
                        style={{ width: '21.75px', height: '20.25px' }}
                    />
                </button> */}
                <button className={header['download-button']}>
                    <img
                        src='/download-icon.svg'
                        alt='download'
                        style={{ width: '15.63px', height: '15.63px' }}
                    />
                    <span>Download App</span>
                </button>
            </div>
        </div>
    );
}

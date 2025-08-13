import { NavLink } from 'react-router-dom';

import navbar from './styles/Navbar.module.css';

const buttons = [
    {
        path: 'chat',
        icon: '/home-icon.svg',
        width: '18.75px',
        height: '19.5px',
    },
    {
        path: 'charts',
        icon: '/charts-icon.svg',
        width: '20.25px',
        height: '18px',
    },
    {
        path: 'community',
        icon: '/community-icon.svg',
        width: '20.25px',
        height: '19.53px',
    },
    {
        path: 'calendar',
        icon: '/calendar-icon.svg',
        width: '18.75px',
        height: '20.25px',
    },
    {
        path: 'thunder',
        icon: '/thunder-icon.svg',
        width: '17.25px',
        height: '23.26px',
    },
    {
        path: 'notifications',
        icon: '/notifications-icon.svg',
        width: '18.75px',
        height: '20.25px',
    },
];

export default function Navbar() {
    return (
        <div className={navbar.navbar}>
            <div className={navbar['top-container']}>
                <div className={navbar.logo}>
                    <img
                        src='/navbar-logo-text.svg'
                        alt='logo-text'
                        className={navbar['logo-text']}
                    />
                    <img
                        src='/navbar-logo.png'
                        alt='logo'
                        className={navbar['logo-icon']}
                    />
                </div>

                <div className={navbar.buttons}>
                    {buttons.map((button) => (
                        <NavLink
                            to={button.path}
                            key={button.path}
                            className={({ isActive }) =>
                                isActive
                                    ? `${navbar.button} ${navbar['active-button']}`
                                    : `${navbar.button}`
                            }
                        >
                            <img
                                src={button.icon}
                                alt='btn'
                                className={navbar[button.path]}
                                style={{
                                    width: button.width,
                                    height: button.height,
                                }}
                            />
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className={navbar['bot-container']}>
                <NavLink
                    to='/settings'
                    className={({ isActive }) =>
                        isActive
                            ? `${navbar['settings-container']} ${navbar['active-button']}`
                            : navbar['settings-container']
                    }
                >
                    <img
                        src='/settings-icon.svg'
                        alt='settings'
                        className={navbar['settings-icon']}
                    />
                </NavLink>
                {/* <img
                    src='/default-avatar.png'
                    alt='avatar'
                    className={navbar.avatar}
                /> */}
            </div>
        </div>
    );
}

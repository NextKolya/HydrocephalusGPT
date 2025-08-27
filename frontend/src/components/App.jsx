import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import Navbar from './Navbar';
import Header from './Header';
import Chat from './Chat';
import Sidebar from './Sidebar';

export default function App() {
    return (
        <Router>
            <Navbar />
            <div className='main-content'>
                <Header />

                <Routes>
                    <Route
                        path='/'
                        element={<Navigate to='/chat' replace />}
                    ></Route>
                    <Route path='/chat' element={<Chat />}></Route>
                    <Route
                        path='/chat/:currentChatId'
                        element={<Chat />}
                    ></Route>
                </Routes>
            </div>

            <Sidebar />
        </Router>
    );
}

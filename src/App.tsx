import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';  // Updated import to match the correct path
import Sidebar from './components/sidebar';
import Contacts from './pages/Contacts';
import Charts from './pages/Charts';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8 ml-64">
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/charts-and-maps" element={<Charts />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

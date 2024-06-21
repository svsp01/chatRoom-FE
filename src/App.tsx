
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LayoutComponent from './layout/LayoutComponent';
import Login from './component/Login';
import ChatRoom from './component/ChatRoom';
import RootRedirect from './layout/RootRedirect';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<RootRedirect/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route  element={<LayoutComponent/>}>
          <Route path='/chat' element ={<ChatRoom/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

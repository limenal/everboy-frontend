import './App.css';
import RouterPages from './router'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
function App() {
  
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <div className="m-10">
          <RouterPages />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

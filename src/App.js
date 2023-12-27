import './App.css';
import {Outlet} from 'react-router-dom'


function App() {
console.log(Outlet)
  return (
    <div>
     <Outlet /> 
    </div>
  );
}

export default App;

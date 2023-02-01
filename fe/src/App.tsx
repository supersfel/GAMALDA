import './App.css';
import { Route, Routes } from 'react-router-dom';
import Introduce from 'pages/Introduce';

import 'styles/main.css';

function App() {
  return (
    <Routes>
      <Route path="" element={<Introduce />}></Route>
    </Routes>
  );
}

export default App;

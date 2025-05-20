import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './dbContext/DatabaseContext';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
          </Route>
        </Routes>
      </Router>
    </DatabaseProvider>
  );
}

export default App;

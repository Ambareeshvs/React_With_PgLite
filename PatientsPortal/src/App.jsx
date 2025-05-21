import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './dbContext/DatabaseContext';
import Layout from './components/common/Layout';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          </Route>
        </Routes>
      </Router>
    </DatabaseProvider>
  );
}

export default App;

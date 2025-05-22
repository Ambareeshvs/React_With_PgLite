import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './dbContext/DatabaseContext';
import Layout from './components/common/Layout';
import Dashboard from './components/pages/Dashboard';
import RegisterPatient from './components/pages/RegisterPatient';
import QueryPatient from './components/pages/QueryPatient';
import GetAllPatient from './components/pages/GetAllpatient';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<RegisterPatient />} />
          <Route path="query" element={<QueryPatient />} />
          <Route path="list" element={<GetAllPatient />} />

          </Route>
        </Routes>
      </Router>
    </DatabaseProvider>
  );
}

export default App;

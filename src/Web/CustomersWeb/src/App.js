import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import appRoutes from './routes/appRoutes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

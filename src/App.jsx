import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import HomeComponent from './components/Home/Home'
import LeaderboardPage from './components/LeadersBoardPage';

// Placeholder components - you should move these to their own files later
// const Home = () => <div className="page">Welcome to the Home Page</div>;
// const Dashboard = () => <div className="page">Wallet Dashboard</div>;

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Default Route (Home) */}
          <Route path="/" element={<HomeComponent />} />
          <Route path="/leaders-board" element={<LeaderboardPage />} />
          
          {/* Example of additional routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          
          {/* Catch-all route for 404s (Optional) */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>
    </>
  )
}

export default App
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Layout/Header';
import { DailyRecommendation } from './components/DailyRecommendation/DailyRecommendation';
import { LearningInterface } from './components/LearningInterface/LearningInterface';
import { Backlog } from './components/Backlog/Backlog';
import { History } from './components/History/History';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route
              path="/learning"
              element={<LearningInterface />}
            />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <main className="py-6">
                    <Routes>
                      <Route path="/" element={<DailyRecommendation />} />
                      <Route path="/backlog" element={<Backlog />} />
                      <Route path="/history" element={<History />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

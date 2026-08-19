import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Install from './pages/Install'
import Build from './pages/Build'
import Contribute from './pages/Contribute'
import Docs from './pages/Docs'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-[100dvh] flex-col bg-zig-bg">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/install" element={<Install />} />
            <Route path="/build" element={<Build />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

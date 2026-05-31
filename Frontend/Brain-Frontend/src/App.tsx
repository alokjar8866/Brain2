import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { Dashboard } from "./pages/Dashboard"
import PreLanding from "./pages/PreLanding"
import LandingPage from "./pages/LandingPage"
import { Toaster } from "sonner"
import { SharedBrainPage } from "./pages/SharedBrainPage"

function App() {
  return <BrowserRouter>
    <Toaster position="bottom-right" richColors duration={3000} theme="system" />
    <Routes>
      <Route path="/home" element={<PreLanding />} />
      <Route path="/home2" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/brain/shared/:shareLink" element={<SharedBrainPage />} />
    </Routes>
  </BrowserRouter>
}

export default App

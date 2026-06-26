import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import { useRestoreSession } from "./hooks/useRestoreSession";
import Home from "./pages/Home";

const Signup = lazy(() =>
  import("./pages/Signup").then((module) => ({ default: module.Signup }))
);

const Signin = lazy(() =>
  import("./pages/Signin").then((module) => ({ default: module.Signin }))
);

const DashboardLayout = lazy(() => import("./DashboardLayout"));
const DashboardAll = lazy(() => import("./pages/DashboardAll"));
const DashboardType = lazy(() => import("./pages/DashboardType"));
const SharedBrain = lazy(() => import("./pages/SharedBrain"));


function App() {
  const { isRestoring } = useRestoreSession();

  if (isRestoring) {
    return < PageLoader/>;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/share/:hash" element={<SharedBrain />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardAll />} />
            <Route path=":type" element={<DashboardType />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;;

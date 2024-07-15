import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule/Schedule";
import ScheduleList from "./pages/Schedule/ScheduleList";
import Layout from "./components/Layout";

const AppRoutes = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Schedule />} />
          <Route path="lista-agendamentos" element={<ScheduleList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default AppRoutes;

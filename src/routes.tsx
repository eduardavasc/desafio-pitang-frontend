import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule/Schedule";
import SchedulesList from "./pages/ListSchedules/SchedulesList";
import Layout from "./components/Layout";

const AppRoutes = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Schedule />} />
          <Route path="lista-agendamentos" element={<SchedulesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default AppRoutes;

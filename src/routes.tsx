import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule/Schedule";
import ScheduleList from "./pages/Schedule/ScheduleList";

const AppRoutes = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<Schedule />} path="/" />
        <Route element={<ScheduleList />} path="/lista-agendamentos" />
      </Routes>
    </BrowserRouter>
  </>
);

export default AppRoutes;

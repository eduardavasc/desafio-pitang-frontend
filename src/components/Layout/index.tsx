// Layout.tsx
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';



const Layout = () => (
  <>
    <NavBar/>
    <Outlet />
  </>
);

export default Layout;

import { NavLink, Outlet } from "react-router-dom";
import Container from "../pages/Shared/Container/Container";
import { FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import useSelectedClass from "../hooks/useSelectedClass";

const Dashboard = () => {
  const [selectedClass] = useSelectedClass();

  const navOptions = (
    <>
      <li>
        <NavLink to='/dashboard/home'>
          <FaHome /> User Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/history'>
          <FaWallet /> Payment History
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/my-booking'>
          <FaShoppingCart /> My Selected Classes
          <span className='badge badge-secondary'>
            +{selectedClass?.length || 0}
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/my-enrolled'>
          <MdPayment /> My Enrolled Classes
        </NavLink>
      </li>
    </>
  );

  return (
    <Container>
      <div className='drawer'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          {/* Navbar */}
          <div className='w-full navbar bg-base-300'>
            <div className='flex-none lg:hidden'>
              <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-6 h-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </div>
            <div className='flex-1 px-2 mx-2 cursor-pointer'>
              <NavLink to='/'>Dashboard</NavLink>
            </div>
            <div className='flex-none hidden lg:block'>
              <ul className='menu menu-horizontal'>
                {/* Navbar menu content here */}
                {navOptions}
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
          <ul className='menu p-4 w-80 h-full bg-base-200'>
            {/* Sidebar content here */}
            {navOptions}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

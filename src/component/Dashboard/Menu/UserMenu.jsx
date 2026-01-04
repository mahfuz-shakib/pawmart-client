import { NavLink } from "react-router";
import { FaHome, FaPlusCircle, FaClipboardList, FaCreditCard, FaUser } from "react-icons/fa";

const UserMenu = () => {
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/homepage"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex"
          data-tip="Homepage"
        >
          <FaHome className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidde">Home page</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex"
          data-tip="Add Listing"
          to="/dashboard/addListing"
        >
          <FaPlusCircle className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidde">Add Listing</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex"
          data-tip="MyListings"
          to="/dashboard/myListings"
        >
          <FaClipboardList className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidde">My Listings</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex"
          data-tip="MyOrders"
          to="/dashboard/myOrders"
        >
          <FaClipboardList className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidde">My Orders</span>
        </NavLink>
      </li>
    
      <li>
        <NavLink
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex"
          data-tip="My Profile"
          to="/dashboard/myProfile"
        >
          <FaUser className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidde">My Profile</span>
        </NavLink>
      </li>
    </>
  );
};

export default UserMenu;









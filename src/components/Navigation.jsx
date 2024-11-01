import { NavLink } from "react-router-dom";
import '../css/Components.css'

const Navigation = () => {
  return(
    <div>
        <nav className="navigation-look">
            <NavLink 
            className="nav-style"
            to="/">
                Home🏠
            </NavLink>
            <NavLink 
            className="nav-style"
            to="/movies">
                Movies📺
            </NavLink>
        </nav>
    </div>
  );
}

export default Navigation;
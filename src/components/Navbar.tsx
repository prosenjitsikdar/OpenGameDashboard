import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link> | <Link to="/user/1">Profile</Link>
        </nav>
    );
};

export default Navbar;
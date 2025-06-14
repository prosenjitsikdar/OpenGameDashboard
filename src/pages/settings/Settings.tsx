import { Outlet } from 'react-router-dom';

const Settings = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl text-my font-poppins font-bold">Settings</h1>
            <Outlet />
        </div>
    );
};

export default Settings;
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";
import Sidebar from "./SIdebar";

function Layout(){
    const [openSideBar, setSideBarOpen] = useState(false);
    return(
        <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onMenuClick={() => setSideBarOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
            <Sidebar open={openSideBar} onClose={() => setSideBarOpen(false)} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-cyan-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Outlet />
            </div>
            </main>
        </div>
        </div>
    );
}

export default Layout;
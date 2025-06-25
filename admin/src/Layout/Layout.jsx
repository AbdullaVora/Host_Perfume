import { useState } from "react";
import Aside from "./Aside";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div>
      {/* Sidebar */}
      <Aside isCollapsed={isSidebarCollapsed} toggleCollapse={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main 
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isSidebarCollapsed ? "ml-16" : "ml-55"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
import { useState, useEffect } from "react";
import {
  BarChart2,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Hook to handle automatic collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Adjust this breakpoint as needed
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set the initial state based on the current screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`min-h-screen bg-background flex shadow-lg dark:border-r-2`}
    >
      <div
        className={`${
          isCollapsed ? "w-18" : "w-48"
        } transition-all duration-300 shadow-md overflow-hidden`}
      >
        <div className="p-4">
          <button
            onClick={toggleCollapse}
            className="text-primary dark:text-foreground hover:bg-secondary p-2 rounded-full"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          <Link
            to="/todos"
            className="flex text-primary dark:text-foreground m-2 p-4 hover:bg-secondary rounded-full"
          >
            <CheckCircle className="mr-3 h-6 w-6" />
            {!isCollapsed && "Todos"}
          </Link>

          <Link
            to="/calendar"
            className="flex text-primary dark:text-foreground m-2 p-4 hover:bg-secondary rounded-full"
          >
            <Calendar className="mr-3 h-5 w-5" />
            {!isCollapsed && "Calendar"}
          </Link>
          <Link
            to="/stats"
            className="flex text-primary dark:text-foreground m-2 p-4 hover:bg-secondary rounded-full"
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            {!isCollapsed && "Statistics"}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

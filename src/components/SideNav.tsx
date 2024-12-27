import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
    FaUser,
    FaCalendarAlt,
    FaComments,
    FaClock,
    FaHome,
    FaChevronRight,
} from "react-icons/fa";
import Layout from "@/components/layout";
import Footer from "./footer";

const SideNav: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const router = useRouter();
    const userId = Cookies.get("userId");

    useEffect(() => {
        const userRole = Cookies.get("role");
        setRole(userRole || null);

        if (!Cookies.get("token")) {
            router.push("/login");
        }

        const currentPath = router.asPath;
        const currentMenuItem = menuItems.find(
            (item) =>
                currentPath.includes(item.link) ||
                (item.link.includes("appointments") &&
                    currentPath.includes("appointments")) ||
                (item.label === "Chat room" && currentPath.includes("/chat"))
        );

        // Nếu không có mục nào khớp, chọn "Tổng Quan" là mặc định khi vào trang Dashboard
        setSelectedItem(currentMenuItem?.label || "Tổng Quan");
    }, [router]);

    const menuItems =
        role === "guest"
            ? [
                { label: "Tổng Quan", icon: <FaHome />, link: "/dashboard" },
                { label: "Hồ Sơ", icon: <FaUser />, link: `/profile?id=${userId}` },
                {
                    label: "Lịch Khám",
                    icon: <FaCalendarAlt />,
                    link: `/appointments?id=${userId}`,
                },
                { label: "Trò Chuyện", icon: <FaComments />, link: "/chat" },
            ]
            : [
                { label: "Tổng Quan", icon: <FaHome />, link: "/dashboard" },
                { label: "Hồ Sơ", icon: <FaUser />, link: `/profile?id=${userId}` },
                {
                    label: "Thời Gian Biểu",
                    icon: <FaClock />,
                    link: "/schedule",
                },
                {
                    label: "Lịch Hẹn",
                    icon: <FaCalendarAlt />,
                    link: "/appointments",
                },
                { label: "Trò Chuyện", icon: <FaComments />, link: "/chat" },
            ];

    const handleItemClick = (item: { label: string; link: string }) => {
        setSelectedItem(item.label);
        router.push(item.link);
    };

    return (
        <div className="dashboard-container flex">
            <Sidebar
                menuItems={menuItems}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
            />
            <div className="content flex-grow">
                {!role && (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Sidebar = ({
    menuItems,
    selectedItem,
    onItemClick,
}: {
    menuItems: { label: string; link: string; icon: JSX.Element }[];
    selectedItem: string | null;
    onItemClick: (item: { label: string; link: string }) => void;
}) => {
    const [open, setOpen] = useState(true);

    return (
        <motion.nav
            layout
            className="sidebar sticky top-0 h-full border-r border-slate-200 bg-blue-950 text-white px-3 py-12"
            style={{ width: open ? "275px" : "fit-content" }}
        >
            <div className="space-y-1">
                {menuItems.map((item) => (
                    <Option
                        key={item.label}
                        icon={item.icon}
                        title={item.label}
                        selected={selectedItem}
                        onClick={() => onItemClick(item)}
                        open={open}
                    />
                ))}
            </div>

            <ToggleClose open={open} setOpen={setOpen} />
        </motion.nav>
    );
};

const Option = ({
    icon,
    title,
    selected,
    onClick,
    open,
}: {
    icon: JSX.Element;
    title: string;
    selected: string | null;
    onClick: () => void;
    open: boolean;
}) => (
    <motion.button
        layout
        onClick={onClick}
        className={`relative flex h-14 w-full items-center rounded-md transition-colors ${selected === title ? "bg-blue-800 text-white" : "text-slate-300 hover:bg-blue-900 hover:text-white"
            }`}
    >
        <motion.div layout className="grid h-full w-14 place-content-center text-2xl">
            {icon}
        </motion.div>
        {open && (
            <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="text-base font-medium"
            >
                {title}
            </motion.span>
        )}
    </motion.button>
);

const ToggleClose = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
    <motion.button
        layout
        onClick={() => setOpen((pv) => !pv)}
        className="absolute bottom-0 left-0 right-0 border-t border-slate-700 transition-colors hover:bg-blue-900"
    >
        <div className="flex items-center px-5 py-3">
            <motion.div layout className="grid size-10 place-content-center text-lg">
                <FaChevronRight
                    className={`transition-transform ${open && "rotate-180"}`}
                />
            </motion.div>
            {open && (
                <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-base font-medium"
                >
                    Thu gọn
                </motion.span>
            )}
        </div>
    </motion.button>
);

export default SideNav;

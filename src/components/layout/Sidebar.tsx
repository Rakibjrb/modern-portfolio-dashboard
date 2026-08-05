import { Layout, Menu } from "antd";
import { Calendar, ChevronLeft, ChevronRight, GraduationCap, LayoutDashboard, Settings } from "lucide-react";
import { Link } from "react-router";

const { Sider } = Layout;


const sidebarItems = [
    {
        key: "1",
        label: <Link to="/dashboard" className="text-sm">Dashboard</Link>,
        icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
        key: "2",
        label: <Link to="/dashboard/projects" className="text-sm">Projects</Link>,
        icon: <Calendar className="w-5 h-5" />,
    },
    {
        key: "3",
        label: <Link to="/dashboard/experiences" className="text-sm">Experiences</Link>,
        icon: <GraduationCap className="w-5 h-5" />,
    },
];

export default function Sidebar({ minimizeSidebar, setMinimizeSidebar, openKeys, onOpenChange }: { minimizeSidebar: boolean, setMinimizeSidebar: (value: boolean) => void, openKeys: string[], onOpenChange: (keys: string[]) => void }) {
    return (
        <Sider
            collapsible
            collapsed={minimizeSidebar}
            trigger={null}
            breakpoint="lg"
            collapsedWidth={80}
            style={{ backgroundColor: "white" }}
            width={300}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    zIndex: "9999",
                }}>
                {/* logo and close button */}
                <div
                    className="flex justify-between items-center relative"
                    style={{ padding: "16px" }}>
                    {minimizeSidebar ? (
                        <div className="text-2xl font-extrabold">
                            .O<span className="text-orange-500">S</span>
                        </div>
                    ) : (
                        <div className="text-2xl">Portfolio<span className="text-orange-500 font-extrabold">.OS</span></div>
                    )}

                    <button
                        onClick={() => setMinimizeSidebar(!minimizeSidebar)}
                        className={`flex justify-center items-center bg-white border border-slate-200 w-7 h-7 rounded-[8px] cursor-pointer absolute top-4 ${minimizeSidebar ? "-right-5" : "right-4"
                            }`}
                        style={{ padding: "6px" }}>
                        {minimizeSidebar ? <ChevronRight className="text-xl" /> : <ChevronLeft className="text-xl" />}
                    </button>
                </div>

                {/* separator */}
                <div style={{ padding: "0px 16px" }}>
                    <div className="w-full h-[1px] bg-[#EAECF0]" />
                </div>

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        marginTop: "14px",
                        padding: "0 10px",
                    }}>
                    {/* render mobile collapsed menu */}
                    <>
                        <Menu
                            theme="light"
                            mode="inline"
                            items={sidebarItems}
                            style={{
                                borderRight: 0,
                                background: "transparent",
                            }}
                            className="border-none"
                            expandIcon={false}
                            inlineCollapsed={minimizeSidebar}

                            // controll auto collapse sidebar sub menu items
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                        />

                        {/* settings button */}
                        {!minimizeSidebar ? (
                            <div className="mx-1">
                                <button
                                    className="w-full flex items-center gap-3 px-6 cursor-pointer hover:bg-[#F0F0F0] transition-all duration-500 py-2 rounded-lg">
                                    <Settings className="w-5 h-5" />
                                    Settings
                                </button>
                            </div>
                        ) : (
                            <div className="px-1">
                                <button
                                    className=" w-full flex items-center gap-3 px-4 cursor-pointer hover:bg-[#F0F0F0] transition-all duration-500 py-2 rounded-lg">
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </Sider>
    )
}
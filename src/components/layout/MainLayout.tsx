import { ConfigProvider, Layout } from "antd";
import { Outlet, useLocation } from "react-router";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = () => {
    const [minimizeSidebar, setMinimizeSidebar] = useState(false); // show sidebar with text statte
    const [openKeys, setOpenKeys] = useState([]); // store open submenu item keys
    const path = useLocation();
    const pathname = path.pathname;

    const onOpenChange = (keys) => {
        const latest = keys.find((key) => !openKeys.includes(key));
        setOpenKeys(latest ? [latest] : []);
    };

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMinimizeSidebar(true);
        }
    }, [pathname]);

    useEffect(() => {
        if (minimizeSidebar) {
            setOpenKeys([]);
        }
    }, [minimizeSidebar]);

    return (
        <Layout className="h-screen">
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: '"Lexend", sans-serif',
                    },
                    components: {
                        Menu: {
                            itemSelectedColor: "#000",
                            itemSelectedBg: "#F0F0F0",
                            subMenuItemBg: "#fff",
                            subMenuItemSelectedColor: "#000",
                            collapsedIconSize: 20,
                        },
                    },
                }}>

                <Sidebar minimizeSidebar={minimizeSidebar} setMinimizeSidebar={setMinimizeSidebar} openKeys={openKeys} onOpenChange={onOpenChange} />

                <Layout className="overflow-hidden">
                    <Content>
                        <div
                            style={{
                                padding: "24px",
                                minHeight: 360,
                            }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </ConfigProvider>
        </Layout>
    );
};

export default MainLayout;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    LogoutOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const onCollapse = (collapsed) => setCollapsed(collapsed);
    return (
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[location.pathname]}
            >
                <Menu.Item key="/">
                    <HomeOutlined />
                    <span>Домашняя</span>
                    <Link to="/"></Link>
                </Menu.Item>

                <Menu.Item key="/products">
                    <TeamOutlined />
                    <span>Продукты</span>
                    <Link to="/products"></Link>
                </Menu.Item>

                <Menu.Item key="/login">
                    <LogoutOutlined/>
                    <span>Выход</span>
                    <Link to='/login' onClick={() => window.localStorage.removeItem('token')}></Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default App;
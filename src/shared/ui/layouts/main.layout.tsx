import {Layout, Menu} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import type {ItemType, MenuItemType} from "antd/es/menu/interface";
import {Outlet} from "react-router";
import railwayLogo from "../../../assets/images/railway-logo.svg";

const items: ItemType<MenuItemType>[] = [
    {
        key: 'mobileApp',
        label: 'Mobile App'
    },
    {
        key: 'faqs',
        label: 'FAQs'
    },
    {
        key: 'contact',
        label: 'Contact'
    },
    {
        key: 'signUp',
        label: 'Sign Up'
    }
]

function MainLayout() {
    return (
        <Layout style={{ minHeight: '100dvh' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <a href="/">
                    <img style={{ height: '40px' }} src={railwayLogo} alt="Railway Logo"/>
                </a>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Railway Express ©{new Date().getFullYear()} Created by Aleksei, Jaana, Konstantin and Veronika
            </Footer>
        </Layout>
    );
}

export default MainLayout;
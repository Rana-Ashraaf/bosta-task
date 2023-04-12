import React, { useState } from "react";
import { Card, Col, Row, Menu, Input } from "antd";
const { Search } = Input;
const SubMenu = Menu.SubMenu;
function Navbar({ onSearch }: any) {
  const [query, setQuery] = useState("");
  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };
  return (
    <>
      <Row justify={"center"} dir="rtl">
        <Col span={8}>
          <Menu mode="horizontal">
            <img src="/assets/logo.jpg" alt="logo" width={95} />
          </Menu>
        </Col>
        <Col span={8}>
          <Menu mode="horizontal">
            <Menu.Item key="home">الرئيسية</Menu.Item>
            <Menu.Item key="prices">الأسعار</Menu.Item>
            <Menu.Item key="sales">كلم المبيعات</Menu.Item>
          </Menu>
        </Col>
        <Col span={8}>
          <Menu mode="horizontal">
            <SubMenu title="تتبع شحنتك">
              <Card title="تتبع شحنتك">
                <Search
                  onSearch={handleSearchClick}
                  onChange={handleInputChange}
                  placeholder="رقم التتبع"
                  enterButton
                  value={query}
                />
              </Card>
            </SubMenu>
            <Menu.Item key="login">تسجيل الدخول</Menu.Item>
            <Menu.Item id="lang" key="lang">
              EN
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </>
  );
}

export default Navbar;

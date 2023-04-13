import React, { useState } from "react";
import {
  Card,
  Col,
  Layout,
  Row,
  Table,
  Menu,
  Input,
  Steps,
  Result,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { getShipment } from "../endpoints/api";

const description = "This is a description.";
const SubMenu = Menu.SubMenu;
function TrackShipment() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    setSearchQuery(query);
  };
  const { data, isLoading, isFetched, refetch } = useQuery(
    ["shipmentDetails", searchQuery],
    () => getShipment(searchQuery)
  );

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
            <SubMenu key="trackShipment" title="تتبع شحنتك">
              <Card title="تتبع شحنتك">
                <Input.Search
                  onSearch={handleSearch}
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
      <Layout>
        <Row justify="center">
          <Col span={24} md={20}>
            <Card>
              {" "}
              <Steps
                current={1}
                items={[
                  {
                    title: "Finished",
                    description,
                  },
                  {
                    title: "In Progress",
                    description,
                    subTitle: "Left 00:00:08",
                  },
                  {
                    title: "Waiting",
                    description,
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>

        <Row dir="rtl" justify="center">
          <Col span={24} md={15}>
            <table className="customTable">
              <thead>
                <tr>
                  <th>الفرع</th>
                  <th>التاريخ</th>
                  <th>الوقت</th>
                </tr>
              </thead>
              <tbody>
                {isFetched &&
                  !isLoading &&
                  data &&
                  data.TransitEvents &&
                  data.TransitEvents?.length !== 0 &&
                  data.TransitEvents.map((event: any, index: number) => (
                    <tr>
                      <td>Row 1, Cell 1</td>
                      <td>Row 1, Cell 2</td>
                      <td>Row 1, Cell 3</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Col>
          <Col span={24} md={5}>
            <Card></Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default TrackShipment;

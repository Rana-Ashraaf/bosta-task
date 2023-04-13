import React, { useState, useEffect } from "react";
import { Card, Col, Layout, Row, Menu, Input, Steps, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getShipment } from "../endpoints/api";
import { useTranslation } from "react-i18next";

const description = "This is a description.";
const SubMenu = Menu.SubMenu;
function TrackShipment() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [currentState, setCurrentState] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(query);
  };
  const { data, isLoading, isFetched } = useQuery(
    ["shipmentDetails", searchQuery],
    () => getShipment(searchQuery)
  );
  function getTimeFromISO(timestamp: string) {
    const dateObj = new Date(timestamp);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getUTCSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  function getDateFromISO(timestamp: string) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    if (isFetched && !isLoading && data?.CurrentStatus) {
      switch (data.CurrentStatus.state) {
        case "DELIVERED":
          setCurrentState(4);
          break;
        case "CANCELLED":
          setCurrentState(2);
          break;
        case "DELIVERED_TO_SENDER":
          setCurrentState(3);
          break;
        case "CREATED":
          setCurrentState(1);
          break;
        default:
          setCurrentState(1);
      }
    }
  }, [data, isFetched, isLoading]);
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
      {/* end navbar */}
      <Layout>
        <Row justify="center">
          <Col span={24} md={20}>
            <Card>
              {" "}
              <Steps
                current={currentState}
                items={[
                  {
                    title: "تم انشاء الشحنة",
                  },
                  {
                    title: "تم استلام الشحنة من التاجر",
                  },
                  {
                    title: "الشحنة خرجت للتسليم",
                    description,
                  },
                  {
                    title: "تم التسليم",
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>

        <Row dir="rtl" justify="center">
          <Col span={24} md={15}>
            <Card>
              <table className="customTable">
                <thead>
                  <tr>
                    <th>الفرع</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>التفاصيل</th>
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
                        <td>{event.hub}</td>
                        <td>{getDateFromISO(event.timestamp)}</td>
                        <td>{getTimeFromISO(event.timestamp)}</td>
                        <td>{event.state}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>
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

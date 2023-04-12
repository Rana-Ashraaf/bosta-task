import React, { useState } from "react";
import { Card, Col, Layout, Row, Table, Menu, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { getShipment } from "../endpoints/api";
import Navbar from "../components/Navbar";

// table data
interface DataType {
  branch: any;
  date: any;
  time: any;
  details: any;
}
const columns: ColumnsType<DataType> = [
  {
    title: "الفرع",
    key: "branch",
  },
  {
    title: "التاريخ",
    key: "date",
  },
  {
    title: "الوقت",
    key: "time",
  },
  {
    title: "تفاصيل",
    key: "details",
  },
];
// end table data
function TrackShipment() {
  const handleSearch = (query: any) => {
    getShipment(query);
  };
  const { data, isLoading, isFetched } = useQuery(
    ["shipmentDetails"],
    handleSearch
  );
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Layout>
        <Row justify="center">
          <Col span={24} md={20}>
            <Card></Card>
          </Col>
        </Row>
        <Row dir="rtl" justify="center">
          <Col span={24} md={15}>
            <Table columns={columns} />
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

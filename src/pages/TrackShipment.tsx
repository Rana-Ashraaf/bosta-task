import React from "react";
import Navbar from "../components/Navbar";
import { Col, Row } from "antd";
function TrackShipment() {
  return (
    <>
      <Navbar />
      <Row>
        <Col span={24}>col</Col>
      </Row>
      <Row>
        <Col span={18}>col</Col>
        <Col span={6}>col</Col>
      </Row>
    </>
  );
}

export default TrackShipment;

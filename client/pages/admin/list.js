import { Col, Table } from "antd";
import React from "react";
import { useQuery } from "react-query";
import {
  GetAllSoldItems,
  GetAllUsers,
  GetUserDetails,
} from "services/admin.service";

export default function list() {
  const { data: soldItems } = useQuery("soldItems", GetAllSoldItems);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Discount Value",
      dataIndex: "discount_value",
      key: "discount_value",
    },
    {
      title: "Discount Code",
      dataIndex: "discount_id",
      key: "discount_id",
    },
  ];

  return (
    <Col style={{ width: "80%", margin: "2rem auto" }}>
      <h1>Items Purchased</h1>
      <Table columns={columns} dataSource={soldItems} />
    </Col>
  );
}

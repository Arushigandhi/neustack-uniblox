import { Card, message, Row } from "antd";
import DashboardLayout from "components/DashboardLayout";
import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { AddToCart, GetAllItems } from "services/item.service";
import Styles from "../styles/pages/Dashboard.module.scss";

export default function dashboard() {
  const info = useSelector((state) => state.user);

  const { data: products, isLoading } = useQuery("products", GetAllItems);
  console.log(products);

  const addToCartMutation = useMutation(AddToCart, {
    onSuccess: () => {
      message.success("Added to Cart");
    },
    onError: (err) => {
      message.error(err.message);
      console.log(err);
    },
  });

  const addToCart = async (pid) => {
    await addToCartMutation.mutateAsync({
      item_id: pid,
    });
  };

  return (
    <DashboardLayout title="View All Products">
      <Row>
        {products &&
          products.items.map((product, index) => (
            <Card
              className={Styles.card}
              key={index}
              hoverable
              cover={
                <img
                  style={{
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                  }}
                  alt="example"
                  src={product.itemPhoto}
                />
              }
            >
              <Card.Meta
                className={Styles.cardMeta}
                title={product.name}
                description={product.description}
              />
              <Row className={Styles.cardFooter} justify="space-between">
                Rs. {product.price}
                <BsCartPlus
                  onClick={() => addToCart(product._id)}
                  className={Styles.icon}
                />
              </Row>
            </Card>
          ))}
      </Row>
    </DashboardLayout>
  );
}

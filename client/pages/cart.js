import { Button, Card, message, Row, Select } from "antd";
import DashboardLayout from "components/DashboardLayout";
import ModalComponent from "components/ModalComponent";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Checkout, GetAllDiscounts, GetCartItems } from "services/item.service";
import Styles from "../styles/pages/Dashboard.module.scss";

export default function cart() {
  const [option, setOption] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const { data: cart } = useQuery("cart", GetCartItems);

  const { data: discounts } = useQuery("discounts", GetAllDiscounts);

  const checkoutMutation = useMutation(Checkout, {
    onSuccess: (data) => {
      console.log(data);
      message.success("Checkout successful");
      setShow(true);
      setPrice(data.totalPrice);
    },
    onError: (error) => {
      console.log(error);
      message.error(error.message);
    },
  });

  const onCheckout = async () => {
    console.log(option);
    await checkoutMutation.mutateAsync({
      discount_id: option,
    });
  };

  const changeOption = (value) => {
    setOption(value);
  };

  return (
    <DashboardLayout title="View Your Cart">
      <Row>
        {cart &&
          cart.items.map((product, index) => (
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
              </Row>
            </Card>
          ))}
      </Row>
      <Select
        className={Styles.select}
        placeholder={"Select Discount"}
        onChange={(value) => changeOption(value)}
        defaultValue={discounts?.discounts[0]?.discount_name}
      >
        {discounts &&
          discounts.discounts.map((discount, index) => (
            <Select.Option key={index} value={discount._id}>
              {discount.discount_name}
            </Select.Option>
          ))}
      </Select>
      <Button
        type="primary"
        className={Styles.outlineButton}
        onClick={onCheckout}
      >
        Checkout
      </Button>
      <ModalComponent
        show={show}
        setShow={setShow}
        heading="Your total price is:"
      >
        {price}
      </ModalComponent>
    </DashboardLayout>
  );
}

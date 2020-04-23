import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  AutoComplete,
  Spin,
  InputNumber,
} from "antd";
import * as firebase from "firebase";

const FormLayout = () => {
  const [form] = Form.useForm();
  const [mpnc, setMpnc] = useState({});
  const [quantity, setQuantity] = useState();
  const [unitCost, setunitCost] = useState();

  const db = firebase.firestore();
  let mpncRef = db.collection("mpnc");

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };

  useEffect(() => {
    mpncRef
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        let result = {};
        snapshot.forEach((doc) => {
          let key = doc.id;
          let value = doc.data().name;
          result[value] = key;
        });
        setMpnc(result);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, []);

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  if (Object.entries(mpnc).length === 0) {
    return <Spin />;
  }

  return (
    <div>
      <Form {...formItemLayout} form={form}>
        <Form.Item label="Producto">
          <AutoComplete
            dataSource={Object.keys(mpnc).sort()}
            placeholder="ingrese el nombre del producto"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={(val) => console.log(mpnc[val])}
          />
        </Form.Item>
        <Form.Item label="Guia de Remisión">
          <Input placeholder="001-000646" />
        </Form.Item>
        <Form.Item label="Comprobante">
          <Select defaultValue="Factura">
            <Select.Option value="factura">Factura</Select.Option>
            <Select.Option value="boleta">Boleta de Venta</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Fecha">
          <DatePicker format={dateFormatList} />
        </Form.Item>
        <Form.Item label="Cantidad">
          <InputNumber value={quantity} onChange={(val) => setQuantity(val)} />
        </Form.Item>
        <Form.Item label="Costo Unitario">
          <InputNumber value={unitCost} onChange={(val) => setunitCost(val)} />
        </Form.Item>
        <Form.Item label="Costo Total">
          <InputNumber disabled value={(quantity * unitCost || 0).toFixed(2)} />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Guardar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormLayout;

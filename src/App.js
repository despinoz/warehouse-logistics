import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import * as firebase from 'firebase';

import {
  AutoComplete,
  Spin,
  DatePicker,
  Input,
  Select,
  InputNumber
} from 'antd';

const InputGroup = Input.Group;
const { Option } = Select;

function App() {
  const [mpnc, setMpnc] = useState({});
  const [number, setNumber] = useState(0);

  const db = firebase.firestore();
  let mpncRef = db.collection('mpnc');

  useEffect(() => {
    mpncRef
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        let result = {};
        snapshot.forEach(doc => {
          let key = doc.id;
          let value = doc.data().name;
          result[value] = key;
        });
        setMpnc(result);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }, []);

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  const calculateDecimals = val => {
    if (val < 10) {
      console.log(val / 100);
    } else if (val < 100) {
      console.log(+(val / 10).toFixed(2));
    }
    console.log('changed', val);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inv. Materia no Calificada</h1>
      {Object.entries(mpnc).length === 0 ? (
        <Spin />
      ) : (
        <div>
          <AutoComplete
            style={{ width: 200 }}
            dataSource={Object.keys(mpnc).sort()}
            placeholder="ingrese el nombre del producto"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={val => console.log(mpnc[val])}
          />
          <br />
          <DatePicker format={dateFormatList} />
          <br />
          <Input
            placeholder="001-000646"
            style={{ width: '250px' }}
            addonBefore="Guia de Remisión"
          />
          <InputGroup compact>
            <Select defaultValue="Factura">
              <Option value="F">Factura</Option>
              <Option value="BV">Boleta de Venta</Option>
            </Select>
            <Input style={{ width: '25%' }} placeholder="0001-001762" />
          </InputGroup>
          <InputNumber
            type="number"
            style={{ width: '15%' }}
            value={number}
            onChange={calculateDecimals}
          />
        </div>
      )}
    </div>
  );
}

export default App;

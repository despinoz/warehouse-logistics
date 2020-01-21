import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import * as firebase from 'firebase';

import { AutoComplete, Spin } from 'antd';

function App() {
  const [mpnc, setMpnc] = useState({});

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inv. Materia no Calificada</h1>
      {Object.entries(mpnc).length === 0 ? (
        <Spin />
      ) : (
        <AutoComplete
          style={{ width: 200 }}
          dataSource={Object.keys(mpnc).sort()}
          placeholder="ingrese el nombre del producto"
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={value => console.log(mpnc[value])}
        />
      )}
    </div>
  );
}

export default App;

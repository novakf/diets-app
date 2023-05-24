import { Button, Form, Input, Popconfirm, Table, Space } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import axios from "axios";
import { message } from "antd";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  //console.log(record);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
      console.log("record", record);
      console.log("values", values);

      let property = Object.keys(values)[0];
      let change = Object.values(values)[0];
      let product_id = record.product_id;
      fetch("http://localhost:3001/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property,
          change,
          product_id,
        }),
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          messageApi.open({ type: "success", content: data });
        });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Заполните ${title}`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return (
    <td {...restProps}>
      {contextHolder}
      {childNode}
    </td>
  );
};

const ProductsRow = ({ row, login, data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dataS = data[row.key - 1]?.products;
  for (let i = 0; i < dataS?.length; i++) {
    dataS[i].key = dataS[i].product_id;
  }
  const [dataSource, setDataSource] = useState(dataS);
  const [count, setCount] = useState(dataS ? dataS.length : 0);

  const [products, setProducts] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      res.data.sort((a, b) => (a.product_id > b.product_id ? 1 : -1));
      setProducts(res.data);
    });
  }, []);

  console.log(products);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);

    const dish_id = row.dish_id;
    console.log(dish_id);

    fetch(`http://localhost:3001/products/${key}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify({ dish_id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        messageApi.open({ type: "success", content: data });
      });
  };

  const defaultColumns =
    login === "admin"
      ? [
          {
            title: "Продукт",
            dataIndex: "product_name",
            key: "product_name",
            width: "15%",
            editable: true,
          },
          {
            title: "Категория",
            dataIndex: "category",
            key: "category",
            width: "20%",
            editable: true,
          },
          {
            title: "Цена",
            dataIndex: "price",
            key: "price",
            width: "10%",
            editable: true,
          },
          {
            title: "Белки",
            dataIndex: "protein",
            key: "protein",
            width: "10%",
            editable: true,
          },
          {
            title: "Жиры",
            dataIndex: "fats",
            key: "fats",
            width: "10%",
            editable: true,
          },
          {
            title: "Углеводы",
            dataIndex: "carbs",
            key: "carbs",
            width: "10%",
            editable: true,
          },
          {
            title: "",
            key: "actions",
            render: (_, record) =>
              dataSource.length >= 1 ? (
                <Popconfirm
                  title="Уверены?"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <a>Удалить</a>
                </Popconfirm>
              ) : null,
            width: "5%",
          },
        ]
      : [
          {
            title: "Продукт",
            dataIndex: "product_name",
            key: "product_name",
          },
          {
            title: "Категория",
            dataIndex: "category",
            key: "category",
          },
          {
            title: "Цена",
            dataIndex: "price",
            key: "price",
          },
          {
            title: "Белки",
            dataIndex: "protein",
            key: "protein",
          },
          {
            title: "Жиры",
            dataIndex: "fats",
            key: "fats",
          },
          {
            title: "Углеводы",
            dataIndex: "carbs",
            key: "carbs",
          },
        ];

  const handleAdd = () => {
    const newData = {
      product_id: products[products.length - 1].product_id + 1,
      product_name: "*",
      category: "*",
      price: "0",
      protein: "0",
      fats: "0",
      carbs: "0",
      key: count,
    };

    newData.dish_id = row.dish_id;

    console.log(newData);

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        messageApi.open({ type: "success", content: data });
      });

    if (dataSource) setDataSource([...dataSource, newData]);
    else setDataSource([newData]);
    setCount(count + 1);
    //console.log(dataSource);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      {contextHolder}
      {login === "admin" && (
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Добавить продукт
        </Button>
      )}
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
export default ProductsRow;

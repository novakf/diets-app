import { Button, Form, Input, Popconfirm, Table, Space } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";

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
  console.log(record);
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
  return <td {...restProps}>{childNode}</td>;
};

const ProductsRow = ({ row, login, data }) => {
  const dataS = data[row.key - 1]?.products;
  for (let i = 0; i < dataS?.length; i++) {
    dataS[i].key = dataS[i].product_id;
  }
  const [dataSource, setDataSource] = useState(dataS);
  const [count, setCount] = useState(dataS ? dataS.length : 0);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
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
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <a>Delete</a>
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
      product_id: "",
      product_name: "*",
      category: "*",
      price: "0",
      protein: "0",
      fats: "0",
      carbs: "0",
      key: count,
    };

    if (dataSource) setDataSource([...dataSource, newData]);
    else setDataSource([newData]);
    setCount(count + 1);
    console.log(dataSource);
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
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Добавить продукт
      </Button>
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

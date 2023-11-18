import React, { useState } from "react";
import { Table, Button, Space } from "antd";

const ExpandedRow = ({ row, data, login }) => {
  const [update, setUpdate] = useState(false);

  const columns =
    login === "admin"
      ? [
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
          {
            title: (
              <Button type="primary" onClick={() => addProduct()}>
                Добавить
              </Button>
            ),
            key: "actions",
            render: (_) => {
              <Space>
                <a>Del</a>
              </Space>;
            },
            width: "60px",
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

  const dataSource = data[row.key - 1]?.products;
  for (let i = 0; i < dataSource?.length; i++) {
    dataSource[i].key = dataSource[i]?.product_id;
  }

  function addProduct() {
    const newData = {
      product_id: "1",
      product_name: `product ${dataSource.length}`,
      category: "new",
      protein: "1",
      fats: "1",
      carbs: "1",
      key: dataSource.length,
    };
    dataSource[dataSource.length] = newData;
    setUpdate(!update);
  }

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default ExpandedRow;

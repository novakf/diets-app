import React, { useState } from "react";
import styled from "styled-components";
import { Table, Button, Input } from "antd";
import productsMock from '../mocks/products'

const ProductPage = () => {
  const [products, setProducts] = useState(productsMock);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const data = products;
  for (let i = 0; i < data.length; i++) data[i].key = data[i].product_id;

  if (data) data.sort((a, b) => a.product_id - b.product_id);

  const [res, setRes] = useState(data);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const handleSearch = (e) => {
    const results = data.filter((prod) => {
      if (e.target.value === "") return prod;
      return prod.product_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRes(results);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "product_id",
      key: "product_id",
      width: "50px",
    },
    {
      title: "Название",
      dataIndex: "product_name",
      key: "product_name",
      onFilter: (value, record) => {
        record.dataIndex.toString().toLowerCase().includes(value.toLowerCase());
      },
      render: (text) => text,
    },
    {
      title: "Категория",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Каши", value: "Каши" },
        { text: "Мучное", value: "Мучное" },
        { text: "Яйца", value: "Яйца" },
        { text: "Кисломолочные", value: "Кисломолочные" },
        { text: "Мясо", value: "Мясо" },
        { text: "Ягоды", value: "Ягоды" },
        { text: "Фрукты", value: "Фрукты" },
        { text: "Овощи", value: "Овощи" },
      ],
      filteredValue: filteredInfo.category || null,
      onFilter: (value, record) => record.category.includes(value),
      ellipsis: true,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 4,
      },
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Белки",
      dataIndex: "protein",
      key: "protein",
      sorter: {
        compare: (a, b) => a.protein - b.protein,
        multiple: 3,
      },
      sortOrder: sortedInfo.columnKey === "protein" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Жиры",
      dataIndex: "fats",
      key: "fats",
      sorter: {
        compare: (a, b) => a.fats - b.fats,
        multiple: 2,
      },
      sortOrder: sortedInfo.columnKey === "fats" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Углеводы",
      dataIndex: "carbs",
      key: "carbs",
      sorter: {
        compare: (a, b) => a.carbs - b.carbs,
        multiple: 1,
      },
      sortOrder: sortedInfo.columnKey === "carbs" ? sortedInfo.order : null,
      ellipsis: true,
    },
    //    {
    //      title: "Actions",
    //      key: "actions",
    //      render: (_) => {
    //        <Space>
    //          <a>Del</a>
    //        </Space>;
    //      },
    //    },
  ];

  return (
    data && (
      <div>
        <SButton onClick={clearFilters}>Очистить фильтры</SButton>
        <SButton onClick={clearAll}>Очистить фильтры и сортировки</SButton>
        <Input
          placeholder="Поиск по названию продукта"
          onChange={handleSearch}
        />
        <Table
          dataSource={res ? res : data}
          columns={columns}
          pagination={false}
          onChange={handleChange}
        />
      </div>
    )
  );
};

const SButton = styled(Button)`
  margin-bottom: 16px;
  margin-right: 10px;
`;

export default ProductPage;

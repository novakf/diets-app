import React, { useState } from "react";
import styled from "styled-components";
import { Table, Space, Button, Input } from "antd";

const DishesPage = () => {
  const [dishes, setDishes] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  fetch("http://localhost:3001/dishes")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      setDishes(data);
    });

  const data = JSON.parse(dishes);
  for (let i = 0; i < data.length; i++) data[i].key = data[i].dish_id;

  if (data) data.sort((a, b) => a.dish_id - b.dish_id);

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
      return prod.dish_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRes(results);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "dish_id",
      key: "dish_id",
      width: "50px",
    },
    {
      title: "Название",
      dataIndex: "dish_name",
      key: "dish_name",
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
        { text: "Первое", value: "Первое" },
        { text: "Второе", value: "Второе" },
        { text: "Напитки", value: "Напитки" },
        { text: "Салаты", value: "Салаты" },
      ],
      filteredValue: filteredInfo.category || null,
      onFilter: (value, record) => record.category.includes(value),
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
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img style={{ width: "100px" }} alt={photo} src={photo} />
      ),
    },
    //    {
    //      title: "Actions",
    //      key: "actions",
    //      render: (_) => {
    //       <Space>
    //          <a>Del</a>
    //        </Space>;
    //      },
    //    },
  ];

  const expandedRow = (row) => {
    const columns = [
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
        title: "Actions",
        key: "actions",
        render: (_) => {
          <Space>
            <a>Del</a>
          </Space>;
        },
      },
    ];

    const dataSource = data[row.key - 1].products;
    for (let i = 0; i < dataSource.length; i++)
      dataSource[i].key = dataSource[i].product_id;

    return (
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    );
  };

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
          expandedRowRender={expandedRow}
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

export default DishesPage;

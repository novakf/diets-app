import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Table,
  Button,
  Input,
  Skeleton,
  Popconfirm,
  Modal,
} from "antd";
import jwtDecode from "jwt-decode";
import { PlusSquareOutlined } from "@ant-design/icons";
import { message } from "antd";
import ProductsRow from "./ProductsRow";
import DishForm from "./DishForm";

const DishesPage = () => {
  const [dishes, setDishes] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const token = window.localStorage.getItem("token");
  let login;
  if (token) login = jwtDecode(token).login;

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      res.data.sort((a, b) => (a.product_id > b.product_id ? 1 : -1));
      setProducts(res.data);
    });
  }, []);

  fetch("http://localhost:3001/dishes")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      setDishes(data);
    });

  function deleteDish(id) {
    fetch(`http://localhost:3001/dishes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        messageApi.open({ type: "success", content: data });
        setUpdate(!update);
      });
  }

  const data = JSON.parse(dishes);
  for (let i = 0; i < data.length; i++) {
    data[i].key = data[i].dish_id;
    //    if (!data[i].photo)
    //      data[i].photo =
    //        "https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu";
  }

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

  const columns =
    login === "admin"
      ? [
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
              record.dataIndex
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase());
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
            sortOrder:
              sortedInfo.columnKey === "protein" ? sortedInfo.order : null,
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
            sortOrder:
              sortedInfo.columnKey === "fats" ? sortedInfo.order : null,
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
            sortOrder:
              sortedInfo.columnKey === "carbs" ? sortedInfo.order : null,
            ellipsis: true,
          },
          {
            title: "Фото",
            dataIndex: "photo",
            key: "photo",
            render: (photo) =>
              photo ? (
                <img style={{ width: "100px" }} alt={photo} src={photo} />
              ) : (
                <Skeleton.Image shape="round" style={{ height: "70px" }} />
              ),
          },
          {
            title: "",
            dataIndex: "",
            key: "actions",
            render: (dish) => (
              <Popconfirm
                title="Уверены?"
                onConfirm={() => deleteDish(dish.dish_id)}
                okText="Да"
                cancelText="Отмена"
              >
                <Button>Удалить</Button>
              </Popconfirm>
            ),
            width: "120px",
          },
        ]
      : [
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
              record.dataIndex
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase());
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
            sortOrder:
              sortedInfo.columnKey === "protein" ? sortedInfo.order : null,
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
            sortOrder:
              sortedInfo.columnKey === "fats" ? sortedInfo.order : null,
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
            sortOrder:
              sortedInfo.columnKey === "carbs" ? sortedInfo.order : null,
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
        ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    data && (
      <div>
        {contextHolder}
        <SButton onClick={clearFilters}>Очистить фильтры</SButton>
        <SButton onClick={clearAll}>Очистить фильтры и сортировки</SButton>
        {login === "admin" && (
          <DButton
            type="primary"
            onClick={showModal}
            icon={<PlusSquareOutlined />}
          >
            Новое блюдо
          </DButton>
        )}

        <DishForm open={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <Input
          placeholder="Поиск по названию продукта"
          onChange={handleSearch}
        />
        <Table
          expandedRowRender={(row) => (
            <ProductsRow
              row={row}
              login={login}
              data={data}
              products={products}
            />
          )}
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

const DButton = styled(Button)`
  position: absolute;
  right: 30px;
  width: 150px;
`;

export default DishesPage;

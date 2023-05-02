import React, { useState } from 'react'
import { Table } from 'antd'

const ProductPage = () => {
    const [products, setProducts] = useState(false);

    fetch('http://localhost:3001')
        .then(response => {
            return response.text();
        })
        .then(data => {
            setProducts(data);
        });

    const data = JSON.parse(products)
    for (let i = 0; i < data.length; i++)
        data[i].key = data[i].product_id
        

    console.log(data)        
    const columns = [
        {
            title: 'ID',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'Название',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Белки',
            dataIndex: 'protein',
            key: 'protein',
        },
        {
            title: 'Жиры',
            dataIndex: 'fats',
            key: 'fats',
        },
        {
            title: 'Углеводы',
            dataIndex: 'carbs',
            key: 'carbs'
        }
    ];



    return (
        <div>
            <Table dataSource={data} columns={columns} />;
        </div>

    )
}

export default ProductPage
import React, { useContext } from "react";

import FactsContext from "../../context/FactsContext";
import style from "./style.module.css";

import { Select } from "antd";
const { Option } = Select;

const Filter = () => {
  const { factCategories, setSelectedCategory } = useContext(FactsContext);

  const renderButton = () => {
    return factCategories.map((category) => {
      return (
        <Option
          key={category}
          className={style.factsCategoriesOption}
          value={category}
          id={category}
        >
          {category.slice(0, 1).toUpperCase() +
            category.slice(1, category.length).toLowerCase()}
        </Option>
      );
    });
  };
  return (
    <div>
      <Select
        allowClear
        autoFocus={true}
        defaultValue="Random"
        showSearch
        className={style.factsCategories}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={(event) => setSelectedCategory(event)}
      >
        {renderButton()}
      </Select>
    </div>
  );
};

export default Filter;

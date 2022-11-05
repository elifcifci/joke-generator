import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import style from "./style.module.css";

//Ant Design
import { Select } from "antd";
const { Option } = Select;

const CategoryList = () => {
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
        notFoundContent
        autoFocus={true}
        defaultValue="Random"
        showSearch
        className={style.factsCategories}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        onChange={(event) => setSelectedCategory(event)}
      >
        {renderButton()}
      </Select>
    </div>
  );
};

export default CategoryList;

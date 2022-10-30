import React, { useContext } from "react";

import JokesContext from "../../context/JokesContext";

import { Select } from "antd";
const { Option } = Select;

const Filter = () => {
  const { jokeCategories, setSelectedCategory } = useContext(JokesContext);

  const renderButton = () => {
    return jokeCategories.map((category) => {
      return (
        <Option key={category} value={category} id={category}>
          {category.slice(0, 1).toUpperCase() +
            category.slice(1, category.length).toLowerCase()}
        </Option>
      );
    });
  };
  return (
    <div>
      <Select
        showSearch
        className="joke-categories"
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={(event) => setSelectedCategory(event)}
        style={{
          width: 200,
        }}
      >
        {renderButton()}
      </Select>
    </div>
  );
};

export default Filter;

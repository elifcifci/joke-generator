import React, { useContext } from "react";

import JokesContext from "../../context/JokesContext";
const Filter = () => {
  const { jokeCategories, updateSelectedCategory } = useContext(JokesContext);

  const renderButton = () => {
    return jokeCategories.map((category) => {
      return (
        <option key={category} value={category} id={category}>
          {category.slice(0, 1).toUpperCase() +
            category.slice(1, category.length).toLowerCase()}
        </option>
      );
    });
  };
  return (
    <div>
      <select className="joke-categories" onChange={updateSelectedCategory}>
        <option value="default" id="default">
          Please select a category
        </option>

        {renderButton()}
      </select>
    </div>
  );
};

export default Filter;

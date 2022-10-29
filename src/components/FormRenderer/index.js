import React from "react";
import { useFormik } from "formik";

import Validation from "../Validation";

const FormRenderer = ({ constants, initialValue, handleClick }) => {
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: initialValue,

      onSubmit: (values) => {
        handleClick(values);
        console.log(values);
      },
      validationSchema: Validation,
    });

  const createFormItems = () => {
    return constants.map((constant) => {
      let itemName = constant.item;
      return (
        <label htmlFor={constant.item} key={itemName}>
          {constant.title}:
          <input
            id={constant.id}
            name={constant.item}
            type={constant.type}
            value={values.itemName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.itemName && touched.itemName && <div>{errors.itemName}</div>}
        </label>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {createFormItems()}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormRenderer;

import React from "react";

const FormSelect = ({ register, name, error }) => {
  return (
    <div>
      <select
        name={name}
        id="jobRole"
        className="px-4 py-2 bg-gray-100 rounded w-full"
        {...register}
      >
        <option value="">--Select Job--</option>
        <option value="frontend-developer">Front-End Developer</option>
        <option value="backend-developer">Back-End Developer</option>
        <option value="database-developer">Database Developer</option>
        <option value="fullstack-developer">Fullstack Developer</option>
      </select>
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
};

export default FormSelect;

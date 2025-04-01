import React from "react";

function GenderCheckbox({ onCheckboxChange, selectedGender }) {
  return (
    <div className="flex">
      <div className="form-control mr-3">
        <label htmlFor="gender_male" className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
          <span className="label-text text-[#EFA21E]">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="gender_female" className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
          <span className="label-text text-[#EFA21E]">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckbox;

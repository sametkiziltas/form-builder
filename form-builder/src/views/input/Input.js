import React from "react";
import { CCol, CLabel, CRow } from "@coreui/react";

const Input = ({ name, label, ...rest }) => {
  return (
    <>
      <CRow>
        <CCol md="12">
          <CLabel>{label}</CLabel>
        </CCol>
        <CCol md="12">
          <p className="form-control-static">
            <input className="form-control" {...rest} name={name} id={name} />
          </p>
        </CCol>
      </CRow>
    </>
  );
};

export default Input;



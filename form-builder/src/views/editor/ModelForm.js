import React, { useState, useEffect } from "react";

import {
  CButton,
  CCol,
  CFormGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CListGroup,
  CListGroupItem,
  CLink,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import useFetch from "../../hooks/useFetch";
const ModelForm = (props) => {
  let accent = "";
  const { dataItem, onAdd} = props;
  const [collapsedProperty, setCollapsedProperty] = useState(true);
  const [modelName, setModelName] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [{ isLoading, response, error }, doFetch] = useFetch();

  const handleSubmit = (e) => {
    doFetch("Sidebar/GetModel?modelName=" + modelName);
  };

  const getApiFieldList = (field) => {
    accent = "light";
    if (
      dataItem.filter((item) => item.properties.name === field.fieldName)
        .length > 0
    )
      accent = "danger";

    return (
      <CListGroupItem
        href="#"
        onClick={() => onAdd(field.fieldType,field.fieldName,field.fieldTitle)}
        accent={accent}
        key={field.fieldName}
      >
        {field.fieldTitle} - {field.fieldType}
      </CListGroupItem>
    );
  };
  useEffect(() => {
    if (!response) {
      return;
    }

    setInitialValues(response);
  }, [response]);

  return (
    <>
      <CCol className="fill" md="12">
        <CCard className="card-accent-warning">
          <CCardHeader>
            <CFormGroup row>
              <CCol className="d-flex" md="12">
                <input
                  value={modelName}
                  onChange={(event) => setModelName(event.target.value)}
                  type="text"
                  name="modelid"
                  id="modelid"
                  className="form-control m-1"
                />
                <CButton
                  color="info"
                  className="float-right m-1"
                  disabled={isLoading}
                  onClick={() => handleSubmit()}
                >
                  <CIcon name="cilPlus"></CIcon>
                </CButton>
              </CCol>
            </CFormGroup>
            Api Fields{" "}
            {initialValues && (
              <div className="card-header-actions">
                <CLink
                  className="card-header-action"
                  onClick={() => setCollapsedProperty(!collapsedProperty)}
                >
                  <CIcon
                    name={
                      collapsedProperty
                        ? "cil-chevron-bottom"
                        : "cil-chevron-top"
                    }
                  />
                </CLink>
              </div>
            )}
          </CCardHeader>
          <CCollapse show={collapsedProperty}>
            {error && (
              <CAlert color="danger">{error} </CAlert>
            )}
            {initialValues && (
              <CCardBody>
                <CListGroup accent>
                  {initialValues.map((field) => getApiFieldList(field))}
                </CListGroup>
              </CCardBody>
            )}
          </CCollapse>
        </CCard>
      </CCol>
    </>
  );
};

export default ModelForm;

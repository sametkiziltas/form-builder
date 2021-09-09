import React, { useState,useEffect } from "react";

import {
  CLabel,
  CButton,
  CCol,
  CFormGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCollapse,
  CSelect,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import Input from "../input/Input";
import { getComponentTypes } from "../../services/componentTypes";

const ControlForm = (props) => {
  const {
    selectedItem,
    selectedControlId,
    onAdd,
    onDelete,
    onChange,
    onAddProperty,
    onDeleteProperty,
    onChangeProperty,
  } = props;
  const [componentType, setComponentType] = useState("optional");
  const [collapsedControl, setCollapsedControl] = useState(true);
  const [collapsedProperty, setCollapsedProperty] = useState(true);
  const [propName, setPropName] = useState("");
  const [panelId, setPanelId] = useState(0);
  useEffect(() => { 
    if (selectedControlId!==0)
    {
          setPanelId(selectedControlId)
    }
  }, [selectedControlId]);
 
   const ChangeControlPanel = (e) => {
    setPanelId(e.currentTarget.value);
    e.currentTarget.name = "cPanelId";
    onChange(e);
  };

  const addClearProperty = (propName) => {
    onAddProperty(propName);
    setPropName("");
  };
  return (
    <>
      <CCol className="fill" md="12">
        <CCard className="card-accent-info">
          <CCardHeader>
            <CFormGroup row>
              <CCol className="d-flex" md="12">
                <CSelect
                  onChange={(e) => setComponentType(e.target.value ?? "")}
                  className="mr-1"
                  value={componentType}
                >
                  <option value="optional">Lütfen Seçiniz...</option>
                  {getComponentTypes().map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                </CSelect>
                <CButton color="info" onClick={() => onAdd(componentType)}>
                  <CIcon name="cilPlus"></CIcon>
                </CButton>
              </CCol>
            </CFormGroup>
            Control Settings {selectedItem && selectedItem.id}
            <div className="card-header-actions">
              {selectedItem && (
                <CLink className="card-header-action">
                  <CIcon
                    name="cil-minus"
                    onClick={() => onDelete(selectedItem.id)}
                  />
                </CLink>
              )}
              <CLink
                className="card-header-action"
                onClick={() => setCollapsedControl(!collapsedControl)}
              >
                <CIcon
                  name={
                    collapsedControl ? "cil-chevron-bottom" : "cil-chevron-top"
                  }
                />
              </CLink>
            </div>
          </CCardHeader>

          {selectedItem && (
            <CCollapse show={collapsedControl}>
              <CCardBody>
                <CCol className="fill" md="12">
                  <CRow>
                    <CCol md="4">
                      <Input
                        name={"panelId"}
                        value={panelId}
                        label={"Panel Id"}
                        type="number"
                        onChange={(e) => setPanelId(e.target.value)}
                        onBlur={(e) => ChangeControlPanel(e)}
                      ></Input>
                    </CCol>
                    <CCol md="4">
                      <Input
                        name={"cCol"}
                        value={selectedItem.cCol}
                        label={"Col"}
                        type="number"
                        onChange={(e) => onChange(e)}
                      ></Input>
                    </CCol>
                    <CCol md="4">
                      <Input
                        name={"cOrder"}
                        value={selectedItem.cOrder}
                        label={"Order"}
                        type="number"
                        onChange={(e) => onChange(e)}
                      ></Input>
                    </CCol>
                  </CRow>
                </CCol>
              </CCardBody>
            </CCollapse>
          )}
        </CCard>
        <CCard className="card-accent-warning">
          <CCardHeader>
            <CFormGroup row>
              <CCol className="d-flex" md="12">
                <input
                  value={propName}
                  onChange={(event) => setPropName(event.target.value)}
                  type="text"
                  name={propName}
                  id={propName}
                  className="form-control m-1"
                />
                <CButton
                  color="info"
                  className="float-right m-1"
                  onClick={() => addClearProperty(propName)}
                >
                  <CIcon name="cilPlus"></CIcon>
                </CButton>
              </CCol>
            </CFormGroup>
            Control Properties {selectedItem && selectedItem.id}
            <div className="card-header-actions">
              <CLink
                className="card-header-action"
                onClick={() => setCollapsedProperty(!collapsedProperty)}
              >
                <CIcon
                  name={
                    collapsedProperty ? "cil-chevron-bottom" : "cil-chevron-top"
                  }
                />
              </CLink>
            </div>
          </CCardHeader>
          <CCollapse show={collapsedProperty}>
            <CCardBody>
              {selectedItem &&
                Object.entries(selectedItem.properties).map(([key, value]) => (
                  <CFormGroup row key={key}>
                    <CCol md="12">
                      <CLabel>
                        <h6 className="m-1">{key}</h6>
                      </CLabel>
                    </CCol>
                    <CCol md="10">
                      <input
                        value={selectedItem.properties[key]}
                        type="text"
                        name={key}
                        id={key}
                        className="form-control m-1"
                        onChange={(e) => onChangeProperty(e)}
                      />
                    </CCol>
                    <CCol md="2">
                      <CButton
                        color="danger"
                        className="float-right m-1"
                        onClick={() => onDeleteProperty(key)}
                      >
                        <CIcon name="cilMinus"></CIcon>
                      </CButton>
                    </CCol>
                  </CFormGroup>
                ))}
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>

      {/* <CFormGroup row>
        <CCol md="6">
          <CLabel>
            <h6></h6>
          </CLabel>
        </CCol>
        <CCol md="6">
          <CButton
            color="danger"
            className="float-right m-1"
            onClick={() => onDelete(selectedItem.id)}
          >
            <CIcon name="cilMinus"></CIcon>
          </CButton>
        </CCol>
      </CFormGroup>

      <div>
        <div className="clearfix mt-4">
          <Input
            name={"panelId"}
            value={panelId}
            label={"Panel Id"}
            type="number"
            onChange={(e) => setPanelId(e.target.value)}
            onBlur={(e) => ChangeControlPanel(e)}
          ></Input>
          <Input
            name={"cCol"}
            value={selectedItem.cCol}
            label={"Col"}
            type="number"
            onChange={(e) => onChange(e)}
          ></Input>
          <Input
            name={"cOrder"}
            value={selectedItem.cOrder}
            label={"Order"}
            type="number"
            onChange={(e) => onChange(e)}
          ></Input>
        </div>
        <CFormGroup row>
          <CCol md="12">
            <CLabel>
              <h6>Control Properties</h6>
            </CLabel>
          </CCol>

          <CCol md="10">
            <input
              value={propName}
              onChange={(event) => setPropName(event.target.value)}
              type="text"
              name={propName}
              id={propName}
              className="form-control m-1"
            />
          </CCol>
          <CCol md="2">
            <CButton
              color="info"
              className="float-right m-1"
              onClick={() => addClearProperty(propName)}
            >
              <CIcon name="cilPlus"></CIcon>
            </CButton>
          </CCol>
        </CFormGroup>
        <div className="clearfix mt-4">
          {Object.entries(selectedItem.properties).map(([key, value]) => (
            <CFormGroup row key={key}>
              <CCol md="12">
                <CLabel>
                  <h6 className="m-1">{key}</h6>
                </CLabel>
              </CCol>
              <CCol md="10">
                <input
                  value={selectedItem.properties[key]}
                  type="text"
                  name={key}
                  id={key}
                  className="form-control m-1"
                  onChange={(e) => onChangeProperty(e)}
                />
              </CCol>
              <CCol md="2">
                <CButton
                  color="danger"
                  className="float-right m-1"
                  onClick={() => onDeleteProperty(key)}
                >
                  <CIcon name="cilMinus"></CIcon>
                </CButton>
              </CCol>
            </CFormGroup>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default ControlForm;

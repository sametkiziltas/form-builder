import React, { useState } from "react";

import {
  CCol,
  CFormGroup,
  CCard,
  CLink,
  CCardHeader,
  CCardBody,
  CCollapse,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import Input from "../input/Input";

const PanelForm = (props) => {
  const { dataItem, onAdd, onDelete, onChange } = props;

  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <CCol className="fill" md="12">
        <CCard className="card-accent-danger">
          <CCardHeader>
            Panel Settings {dataItem && dataItem.id}
            <div className="card-header-actions">
              <CLink className="card-header-action">
                <CIcon name="cil-plus" onClick={() => onAdd()} />
              </CLink>
              {dataItem && (
                <CLink className="card-header-action">
                  <CIcon name="cil-minus" onClick={() => onDelete()} />
                </CLink>
              )}
              <CLink
                className="card-header-action"
                onClick={() => setCollapsed(!collapsed)}
              >
                <CIcon
                  name={collapsed ? "cil-chevron-bottom" : "cil-chevron-top"}
                />
              </CLink>
            </div>
          </CCardHeader>
          <CCollapse show={collapsed}>
            <CCardBody>
              {dataItem && (
                <>
                  <CFormGroup row>
                    <CCol md="12">
                      <CRow>
                        <CCol md="12">
                          <Input
                            name={"pTitle"}
                            value={dataItem.pTitle}
                            label={"Title"}
                            type="text"
                            onChange={(e) => onChange(e)}
                          ></Input>
                        </CCol>
                        <CCol md="6">
                          <Input
                            name={"pCol"}
                            value={dataItem.pCol}
                            label={"Col"}
                            type="number"
                            onChange={(e) => onChange(e)}
                          ></Input>
                        </CCol>
                        <CCol md="6">
                          <Input
                            name={"pOrder"}
                            value={dataItem.pOrder}
                            label={"Order"}
                            type="number"
                            onChange={(e) => onChange(e)}
                          ></Input>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CFormGroup>
                </>
              )}
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
    </>
  );
};

export default PanelForm;

import React from "react";

import { CCard, CCardHeader, CCol, CRow, CInput, CBadge } from "@coreui/react";

const Control = (props) => {
  const { data, selectedId, onSet } = props;

  return (
    <CCol md={data.cCol}>
      <CCard
        className={selectedId === data.id ? "card card-accent-info" : "card"}
      >
        <CCardHeader>
          <CRow className="no-gutters">
            <CCol md="6">{data.properties.label}</CCol>
            <CCol className="text-right" md="6">
              <CBadge
                className="badge-md pointer badge-danger mr-1"
                onClick={() => onSet(data.id ,data.cPanelId)}
              >
                id: #{data.id}
              </CBadge>
              <CBadge
                className="badge-md badge-danger mr-1"
              >
                order:{data.cOrder}
              </CBadge>
            </CCol>
            <CCol md="12">
              <div className="controls mt-1">
                <CInput
                  readOnly
                  id={data.id}
                  value={data.properties.componentType}
                  size="10"
                  type="text"
                />
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
      </CCard>
    </CCol>
  );
};

export default Control;

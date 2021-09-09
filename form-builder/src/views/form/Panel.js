import React from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
} from "@coreui/react";

const Panel = (props) => {
  const { data, selectedId, onSet } = props;

  return (
    <CCol md={data.pCol} key={data.id}>
      <CCard
        className={
          selectedId === data.id
            ? "card-accent-danger"
            : "card-accent-secondary"
        }
      >
        <CCardHeader>
          <CRow className="no-gutters">
            <CCol md="10">{data.pTitle}</CCol>
            <CCol className="text-right" md="2">
              <CBadge
                className="badge-md pointer badge badge-danger mr-1"
                onClick={() => onSet(data.id)}
              >
                id: #{data.id}
              </CBadge>
              <CBadge className="badge-md badge badge-danger mr-1">
                order:{data.pOrder}
              </CBadge>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow> {props.children}</CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default Panel;

import React, { useState } from "react";
import {
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CButton,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import Detail from "./Detail";

const Builder = () => {
  const [rules, setRules] = useState({
    rules: [{ id: 1, title: "", description: "", code: "" }],
  });
  const onSave = () => {};

  const onAdd = () => {
    const maxId = rules.rules.length
      ? Math.max(...rules.rules.map((rule) => rule.id)) + 1
      : 1;
    setRules({
      rules: [
        ...rules.rules,
        {
          id: maxId,
          title: "",
          description: "",
          code: "",
        },
      ],
    });
  };

  const onDelete = (ruleId) => {
    setRules({
      rules: [...rules.rules.filter((rule) => rule.id !== ruleId)],
    });
  };

  const handleChange = ({ currentTarget: input }, selectedId) => {
    setRules({
      ...rules,
      rules: rules.rules.map((item, index) => {
        if (item.id === selectedId) {
          return { ...item, [input.name]: input.value };
        }
        return item;
      }),
    });
  };

  const handleCodeChange = (code, selectedId) => {
    setRules({
      ...rules,
      rules: rules.rules.map((item, index) => {
        if (item.id === selectedId) {
          return { ...item, code: code };
        }
        return item;
      }),
    });
  };

  return (
    <>
      <CCard className="card-accent-secondary">
        <CCardHeader>
          <CRow>
            <CCol xs="12">
              <CButton
                className="float-right m-1"
                color="primary"
                onClick={() => onAdd()}
              >
                <CIcon name="cil-plus" />
              </CButton>
              <CButton
                className="float-right m-1"
                color="primary"
                onClick={() => onSave()}
              >
                <CIcon name="cil-save" />
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {rules.rules
              .sort((a, b) => b.id - a.id)
              .map((rule) => (
                <CCol xs="12" sm="6" md="4" key={rule.id}>
                  <CCard className="card-accent-info">
                    <CCardHeader>
                      Rule #{rule.id}
                      {rule.title ? " - " + rule.title : ""}
                      <div className="card-header-actions">
                        <CLink
                          className="card-header-action"
                          onClick={() => onDelete(rule.id)}
                        >
                          <CIcon name="cil-minus" />
                        </CLink>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <Detail
                        rule={rule}
                        onChange={handleChange}
                        onChangeCode={handleCodeChange}
                      ></Detail>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Builder;

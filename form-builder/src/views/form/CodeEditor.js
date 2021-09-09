import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import { CCardBody, CCol, CCard, CCardHeader, CLink } from "@coreui/react";
import { CIcon } from "@coreui/icons-react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";

import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/addon/hint/css-hint";

const CodeEditor = (props) => {
  const { panels, controls, show, onShow } = props;

  const [result, setResult] = useState("");

  const options = {
    lineNumbers: true,
    mode: "htmlembedded",
    theme: "eclipse",
    autofocus: true,
  };

  useEffect(() => {
    const code = `<Form onSubmit={handleSubmit} render={(formRenderProps) => (
        <FormElement>
          ${panels
            .sort((a, b) => a.pOrder - b.pOrder)
            .map(
              (panel) =>
                `<CCol xs={12} md={${panel.pCol}} key={${
                  panel.id
                }} className="fill">
              <CCard>
                <CCardHeader>
                  <CRow className="no-gutters">
                    <CCol md="10">${panel.pTitle}</CCol>
                    <CCol md="2" className="text-right"></CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                  ${controls
                    .filter((control) => control.cPanelId === panel.id)
                    .sort((a, b) => a.cOrder - b.cOrder)
                    .map(
                      (control) =>
                        `
                        <CCol xs={12} md={${control.cCol}} key={${control.id}}>
                          <Field
                                id={"${control.properties.name}"}
                          ${Object.entries(control.properties)
                            .map(([key, value]) => {
                              if (key === "name" || key === "label") {
                                return (
                                  (key === "name" ? `\t\t` : ``) +
                                  ([key] +
                                    `={"` +
                                    control.properties[key] +
                                    `"}`)
                                );
                              }
                              return (
                                [key] + `={` + control.properties[key] + `}`
                              );
                            })
                            .join("\n\t\t\t\t\t\t\t\t")}
                                readOnly={${"Panel" + panel.id + "Status"}}
                          />
                        </CCol>
                        `
                    )
                    .join("")}
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>`
            )
            .join("")}
            <div className="k-form-buttons">
            <Button
              primary={true}
              type={"submit"}
              disabled={!formRenderProps.allowSubmit}
            >
              Submit
            </Button>
            <Button onClick={formRenderProps.onFormReset}>Clear</Button>
          </div>
        </FormElement>
        )}
     />`;
    setResult(code);
  }, [panels, controls]);

  const copyToClipboard = () => {
    let textField = document.createElement("textarea");
    textField.innerText = result;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    show && (
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Code
            <div className="card-header-actions">
              <CLink className="card-header-action" onClick={copyToClipboard}>
                <CIcon name="cil-copy" />
              </CLink>
              <CLink
                className="card-header-action"
                onClick={() => onShow(false)}
              >
                <CIcon name="cil-x-circle" />
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody>
            <CodeMirror
              value={result}
              options={options}
              onBeforeChange={(editor, data, value) => setResult(value)}
            />
          </CCardBody>
        </CCard>
      </CCol>
    )
  );
};

export default CodeEditor;

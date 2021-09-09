import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CButton,
  CCollapse,
  CCardBody,
  CLabel,
  CTextarea,
} from "@coreui/react";

import Input from "./../input/Input";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/clike/clike";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

const Detail = (props) => {
  const { rule, onChange, onChangeCode } = props;

  const [accordion, setAccordion] = useState(null);
  
  const options = {
    lineNumbers: true,
    mode: "text/x-csharp",
    theme: "eclipse",
    autofocus: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
    },
    styleActiveLine: true,
    matchBrackets: true,
    indentUnit: 4,
    indentWithTabs: false,
    autoCloseTags: true,
    autoCloseBrackets: true,
    autoRefresh: true,
  };
  return (
    <div id="accordion">
      <CCard className="mb-0">
        <CCardHeader id="headingOne">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => setAccordion(accordion === 0 ? null : 0)}
          >
            <h5 className="m-0 p-0">Detail </h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 0}>
          <CCardBody>
            <Input
              name={"title"}
              value={rule.title}
              label={"Title"}
              type="text"
              onChange={(e) => onChange(e, rule.id)}
            ></Input>
            <CLabel>Description</CLabel>
            <CTextarea
              name={"description"}
              value={rule.description}
              style={{ height: "250px" }}
              onChange={(e) => onChange(e, rule.id)}
            ></CTextarea>
          </CCardBody>
        </CCollapse>
      </CCard>
      <CCard className="mb-0">
        <CCardHeader id="headingTwo">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => setAccordion(accordion === 1 ? null : 1)}
          >
            <h5 className="m-0 p-0">Code </h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 1}>
          <CCardBody>
            <CodeMirror
              editorDidMount={(editor) => {
                setTimeout(() => {
                  editor.refresh();
                }, 100);
              }}
              value={rule.code}
              options={options}
              onBeforeChange={(editor, data, value) =>
                onChangeCode(value, rule.id)
              }
            />
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};

export default Detail;

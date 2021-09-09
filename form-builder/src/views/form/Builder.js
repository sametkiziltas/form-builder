import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";

import panelReducer from "../reducers/PanelReducer";
import controlReducer from "../reducers/ControlReducer";

import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
} from "@coreui/react";
import { TheAside } from "../../containers";

import Panel from "./Panel";
import PanelForm from "../editor/PanelForm";
import Control from "./Control";
import ControlForm from "../editor/ControlForm";
import ModelForm from "../editor/ModelForm";
import CodeEditor from "./CodeEditor";

import ReactJson from "react-json-view";

import { getComponentProperties } from "../../services/componentTypes";

const Builder = () => {
  const dispatch = useDispatch();
  const setAsideState = (state) => dispatch({ type: "set", asideShow: state });
  const initialStatePanel = {
    panels: [
      {
        id: 1,
        pTitle: "",
        pCol: 12,
        pOrder: 1,
      },
    ],
    selectedPanelId: 1,
  };

  const initialControlPanel = {
    controls: [],
    selectedControlId: 0,
  };

  const [panelState, dispatchPanel] = useReducer(
    panelReducer,
    initialStatePanel
  );

  const [controlState, dispatchControl] = useReducer(
    controlReducer,
    initialControlPanel
  );

  const handleAddPanel = () => {
    dispatchPanel({
      type: "ADD_PANEL",
    });
  };

  const handleDeletePanel = () => {
    dispatchControl({
      type: "DELETE_ALL_CONTROL",
      panelId: panelState.selectedPanelId,
    });

    dispatchPanel({
      type: "DELETE_PANEL",
    });
  };

  const handleChangePanel = ({ currentTarget: input }) => {
    const value = input.type === "checkbox" ? input.checked : input.value;

    dispatchPanel({
      type: "UPDATE_PANEL",
      name: input.name,
      value: value,
      inputType: input.type,
    });
  };

  const handleSetCurrentPanel = (id) => {
    dispatchPanel({
      type: "CHANGE_CURRENTPANEL",
      id: id,
    });

    if (controlState.controls.length !== 0) {
      dispatchControl({
        type: "CHANGE_CURRENTCONTROL",
        id: 0,
        panelId: id,
      });
    }
    setAsideState(true);
  };

  const handleAddControl = (componentType, name = "", label = "") => {
    const selectedComponent = getComponentProperties().find((cp) =>
      cp.hasOwnProperty(componentType)
    );

    let properties = {
      name: name,
      label: label,
      componentType: componentType,
      defaultValue: "",
      validator: "requiredValidator",
    };

    if (selectedComponent) {
      Object.entries(selectedComponent[componentType]).map(
        ([key, value]) => (properties = { ...properties, [key]: value })
      );
    }

    dispatchControl({
      type: "ADD_CONTROL",
      panelId: panelState.selectedPanelId,
      properties: properties,
    });
  };

  const handleDeleteControl = () => {
    dispatchControl({
      type: "DELETE_CONTROL",
      panelId: panelState.selectedPanelId,
    });
  };

  const handleChangeControl = ({ currentTarget: input }) => {
    if (input.name === "cPanelId") {
      if (!panelState.panels.some((p) => p.id === parseInt(input.value, 10)))
        return;
    }
    dispatchControl({
      type: "UPDATE_CONTROL",
      name: input.name,
      value: input.value,
      inputType: input.type,
    });

    if (input.name === "cPanelId") {
      dispatchPanel({
        type: "CHANGE_CURRENTPANEL",
        id: parseInt(input.value, 10),
      });
    }
  };

  const handleSetCurrentControl = (id, panelId) => {
    dispatchPanel({
      type: "CHANGE_CURRENTPANEL",
      id: panelId,
    });

    dispatchControl({
      type: "CHANGE_CURRENTCONTROL",
      id: id,
    });

    setAsideState(true);
  };

  const handleAddProperty = (propName) => {
    dispatchControl({
      type: "ADD_CONTROL_PROPERTY",
      name: propName,
    });
  };

  const handleDeleteProperty = (currentPropName) => {
    dispatchControl({
      type: "DELETE_CONTROL_PROPERTY",
      name: currentPropName,
    });
  };

  const handleChangeProperty = ({ currentTarget: input }) => {
    dispatchControl({
      type: "UPDATE_CONTROL_PROPERTY",
      name: input.name,
      value: input.value,
    });
  };
  const sortedPanels = panelState.panels.sort((a, b) => a.pOrder - b.pOrder);
  const selectedControl = controlState.controls.find(
    (control) =>
      control.id === controlState.selectedControlId &&
      control.cPanelId === panelState.selectedPanelId
  );

  const [showCode, setShowCode] = useState(false);
  return (
    <>
      <CRow>
        <CCol md="9">
          <CRow>
            <CodeEditor
              show={showCode}
              onShow={(status) => setShowCode(status)}
              panels={panelState.panels}
              controls={controlState.controls}
            ></CodeEditor>

            <hr />
            {sortedPanels.map((panel) => {
              const filteredControls = controlState.controls
                .filter((control) => control.cPanelId === panel.id)
                .sort((a, b) => a.cOrder - b.cOrder);
              return (
                <Panel
                  key={panel.id}
                  data={panel}
                  onSet={handleSetCurrentPanel}
                  selectedId={panelState.selectedPanelId}
                >
                  {filteredControls.map((control) => (
                    <Control
                      key={control.id}
                      data={control}
                      onSet={handleSetCurrentControl}
                      selectedId={controlState.selectedControlId}
                    ></Control>
                  ))}
                </Panel>
              );
            })}
          </CRow>
        </CCol>
        <CCol md="3">
          <CCard className="card-accent-secondary">
            <CCardHeader>
              <CButton
                className="form-control"
                onClick={() => setShowCode(true)}
              >
                Generate
              </CButton>
            </CCardHeader>
            <CCardBody>
              selectedPanelId: {panelState.selectedPanelId}
              <hr />
              <ReactJson src={panelState.panels} />
            </CCardBody>
            <CCardBody>
              selectedControlId: {controlState.selectedControlId}
              <hr />
              <ReactJson src={controlState.controls} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <TheAside>
        <PanelForm
          dataItem={panelState.panels.find(
            (panel) => panel.id === panelState.selectedPanelId
          )}
          onAdd={handleAddPanel}
          onDelete={handleDeletePanel}
          onChange={handleChangePanel}
        ></PanelForm>
        <ModelForm
          dataItem={controlState.controls}
          onAdd={handleAddControl}
        ></ModelForm>
        <ControlForm
          selectedItem={selectedControl}
          selectedControlId={selectedControl ? selectedControl.cPanelId : 0}
          onAdd={handleAddControl}
          onDelete={handleDeleteControl}
          onChange={handleChangeControl}
          onAddProperty={handleAddProperty}
          onDeleteProperty={handleDeleteProperty}
          onChangeProperty={handleChangeProperty}
        ></ControlForm>
      </TheAside>
    </>
  );
};

export default Builder;

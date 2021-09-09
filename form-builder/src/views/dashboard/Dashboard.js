import React, { useState } from "react";

import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { filterBy } from "@progress/kendo-data-query";

import {
  FormInput,
  FormDropDownList,
  FormAutoComplete,
  FormComboBox,
  FormMultiSelect,
  FormNumericTextBox,
  FormDateRangePicker,
  FormDatePicker,
} from "../formcomponents/form-components.js";
import {
  CBadge,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/xml/xml";

import { countries, sizes, sports, genders } from "./data";

const Dashboard = () => {
  const [gendersData, setGendersData] = useState(genders);

  const filterData = (filter) => {
    const data = gendersData.slice();
    return filterBy(data, filter);
  };

  const filterChange = (event) => {
    const newData =
      event.filter.value.length > 3
        ? filterData(event.filter)
        : gendersData.slice();

    setGendersData(newData);
  };

  const handleSubmit = () => {
    alert();
  };

  const requiredValidator = (value) =>
    value ? "" : "Error: This field is required.";

  const arrivalDateValidator = (value) =>
    value ? "" : "Arriaval Date is required";

  const min = new Date(2000, 2, 10);
  const max = new Date(2002, 2, 10);
  const defaultValue = new Date(2001, 2, 10);

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <CCol xs={12} md={12} key={1} className="fill">
              <CCard>
                <CCardHeader>
                  <CRow className="no-gutters">
                    <CCol md="10"></CCol>
                    <CCol md="2" className="text-right"></CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={12}>
                      <Field
                        id={"subscriptionDate"}
                        name={"subscriptionDate"}
                        label={"Subscription"}
                        component={FormDateRangePicker}
                        validator={requiredValidator}
                        defaultValue={defaultValue}
                        min={min}
                        max={max}
                        readonly={true}
                        disabled={true}
                      />
                    </CCol>

                    <CCol xs={12} md={12}>
                      <Field
                        id={"arrivalDate"}
                        name={"arrivalDate"}
                        label={"Arrival Date"}
                        component={FormDatePicker}
                        validator={arrivalDateValidator}
                        defaultValue={defaultValue}
                        min={min}
                        max={max}
                        readonly={false}
                        wrapperStyle={{ width: "30%", marginRight: "18px" }}
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <Field
                        id={"size"}
                        name={"size"}
                        label={"T-Shirt Size"}
                        textField={"label"}
                        filterable={true}
                        onFilterChange={filterChange}
                        component={FormDropDownList}
                        data={gendersData}
                        validator={requiredValidator}
                        readonly={true}
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <Field
                        id={"countryselected"}
                        name={"countryselected"}
                        label={"Country"}
                        hint={"Hint: Only Eroupean countries"}
                        component={FormAutoComplete}
                        data={countries}
                        validator={requiredValidator}
                        readonly={true}
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <Field
                        id={"genderseleceted"}
                        name={"genderselected"}
                        label={"Gender"}
                        component={FormComboBox}
                        textField={"label"}
                        defaultValue={3}
                        data={genders}
                        validator={requiredValidator}
                      />
                    </CCol>

                    <CCol xs={12} md={4}>
                      <Field
                        id={"sport"}
                        name={"sport"}
                        label={"Sport"}
                        hint={"Hint: Your favourite sport"}
                        component={FormMultiSelect}
                        data={sports}
                        validator={requiredValidator}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
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
      />
    </>
  );
};

export default Dashboard;

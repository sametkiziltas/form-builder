const controlReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTROL": {
      const maxOrder = state.controls.reduce(function (max, current) {
        return current.cPanelId === action.panelId
          ? Math.max(max, current.cOrder)
          : max;
      }, 0);

      const maxId = state.controls.length
        ? Math.max(...state.controls.map((control) => control.id)) + 1
        : 1;
      return {
        controls: [
          ...state.controls,
          {
            id: maxId,
            cPanelId: action.panelId,
            cCol: 4,
            cOrder: maxOrder + 1,
            properties: action.properties,
          },
        ],
        selectedControlId: maxId,
      };
    }

    case "DELETE_CONTROL": {
      const maxId = state.controls.reduce(function (max, current) {
        return current.id !== state.selectedControlId &&
          current.cPanelId === action.panelId
          ? Math.max(max, current.id)
          : max;
      }, 0);
      return {
        ...state,
        controls: state.controls.filter(
          (control) => control.id !== state.selectedControlId
        ),
        selectedControlId: maxId,
      };
    }

    case "UPDATE_CONTROL": {
      return {
        ...state,
        controls: state.controls.map((control) => {
          if (control.id === state.selectedControlId) {
            return {
              ...control,
              [action.name]:
                action.inputType === "number"
                  ? parseInt(action.value, 10)
                  : action.value,
            };
          }
          return control;
        }),
      };
    }

    case "CHANGE_CURRENTCONTROL": {
      let maxid = 0;
      if (action.id === 0) {
        maxid = state.controls.reduce(function (max, current) {
          return current.cPanelId === action.panelId
            ? Math.max(max, current.id)
            : max;
        }, 0);
      }

      return {
        ...state,
        selectedControlId: state.controls.length
          ? action.id === 0
            ? maxid
            : action.id
          : 0,
      };
    }

    case "DELETE_ALL_CONTROL": {
      return {
        ...state,
        controls: state.controls.filter(
          (control) => control.cPanelId !== action.panelId
        ),
        selectedControlId: 0,
      };
    }

    case "ADD_CONTROL_PROPERTY": {
      return {
        ...state,
        controls: state.controls.map((control) => {
          if (control.id === state.selectedControlId) {
            if (!control.properties.hasOwnProperty(action.name))
              return {
                ...control,
                properties: { ...control.properties, [action.name]: "" },
              };
          }
          return control;
        }),
      };
    }

    case "DELETE_CONTROL_PROPERTY": {
      return {
        ...state,
        controls: state.controls.map((control) => {
          if (control.id === state.selectedControlId) {
            const { [action.name]: remove, ...rest } = control.properties;
            return { ...control, properties: { ...rest } };
          }
          return control;
        }),
      };
    }

    case "UPDATE_CONTROL_PROPERTY": {
      return {
        ...state,
        controls: state.controls.map((control) => {
          if (control.id === state.selectedControlId) {
            return {
              ...control,
              properties: {
                ...control.properties,
                [action.name]: action.value,
              },
            };
          }
          return control;
        }),
      };
    }

    default: {
      return state;
    }
  }
};
export default controlReducer;

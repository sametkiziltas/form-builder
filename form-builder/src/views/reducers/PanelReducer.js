const panelReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PANEL": {
      const maxid = state.panels.length
        ? Math.max(...state.panels.map((panel) => panel.id)) + 1
        : 1;
      return {
        panels: [
          ...state.panels,
          {
            id: maxid,
            pTitle: "",
            pCol: 12,
            pOrder: state.panels.length
              ? Math.max(...state.panels.map((panel) => panel.pOrder)) + 1
              : 1,
          },
        ],
        selectedPanelId: maxid,
      };
    }

    case "DELETE_PANEL": {
      const maxId = state.panels.reduce(function (max, current) {
        return current.id !== state.selectedPanelId
          ? Math.max(max, current.id)
          : max;
      }, 0);
      return {
        ...state,
        panels: state.panels.filter(
          (panels) => panels.id !== state.selectedPanelId
        ),
        selectedPanelId: maxId,
      };
    }

    case "UPDATE_PANEL": {
      return {
        ...state,
        panels: state.panels.map((panel) => {
          if (panel.id === state.selectedPanelId) {
            return {
              ...panel,
              [action.name]:
                action.inputType === "number"
                  ? parseInt(action.value, 10)
                  : action.value,
            };
          }
          return panel;
        }),
      };
    }

    case "CHANGE_CURRENTPANEL": {
      return {
        ...state,
        selectedPanelId: state.panels.length
          ? action.id === 0
            ? Math.max(...state.panels.map((panel) => panel.id))
            : action.id
          : 0,
      };
    }

    default: {
      return state;
    }
  }
};
export default panelReducer;

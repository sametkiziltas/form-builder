import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CIcon from "@coreui/icons-react";

import {
  CSidebar,
  CSidebarClose,
  CTabPane,
  CTabContent,
  CNavLink,
  CTabs,
  CNav,
  CNavItem,
} from "@coreui/react";
const TheAside = (props) => {
  const show = useSelector((state) => state.asideShow);
  const dispatch = useDispatch();
  const setState = (state) => dispatch({ type: "set", asideShow: state });

  return (
    <CSidebar
      aside
      colorScheme="light"
      size="lg"
      overlaid
      show={show}
      onShowChange={(state) => setState(state)}
    >
      <CSidebarClose onClick={() => setState(false)} />

      <CTabs>
        <CNav variant="tabs" className="nav-underline nav-underline-primary">
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-settings" alt="CoreUI Icons Settings" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-share-alt" alt="CoreUI Icons Speech" />
              </CNavLink>
            </CNavItem>

        </CNav>
        <CTabContent className="overflow-scroll">
          <CTabPane className="p-3">{props.children}</CTabPane>
        </CTabContent>
      </CTabs>
    </CSidebar>
  );
};

export default React.memo(TheAside);

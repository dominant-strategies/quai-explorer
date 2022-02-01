import { extendTheme } from "@chakra-ui/react";

import { globalStyles } from "./styles";
import { font } from "./foundations/fonts";
import { breakpoints } from "./foundations/breakpoints";

import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";

import { CardStyle } from "./additions/card/Card";
import { CardBodyStyle } from "./additions/card/CardBody";
import { CardHeaderStyle } from "./additions/card/CardHeader";

import { MainPanelStyle } from "./additions/layout/MainPanel";
import { PanelContentStyle } from "./additions/layout/PanelContent";
import { PanelContainerStyle } from "./additions/layout/PanelContainer";

export default extendTheme(
  globalStyles,
  font,
  { breakpoints },

  buttonStyles,
  badgeStyles,
  linkStyles,
  drawerStyles,

  CardStyle,
  CardBodyStyle,
  CardHeaderStyle,
  MainPanelStyle,
  PanelContentStyle,
  PanelContainerStyle
  
);

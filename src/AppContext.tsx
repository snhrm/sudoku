import React from "react";
import {Field} from "./lib/ModelInterface";
import {Invalid} from "./lib/util";

type AppContextInterface = {
  field: Field;
  problem: Field;
  invalids: Invalid[];
  handleChange: (x: number, y: number, value?: number) => void;
}

export const AppContext = React.createContext<AppContextInterface>({
  field: [],
  problem: [],
  invalids: [],
  handleChange: () => false,
});

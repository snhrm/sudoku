import React from "react";
import {Field} from "./lib/ModelInterface";
import {createInitialField, Invalid} from "./lib/util";

type AppContextInterface = {
  field: Field
  invalids: Invalid[];
  handleChange: (x: number, y: number, value?: number) => void;
}

export const AppContext = React.createContext<AppContextInterface>({
  field: createInitialField(),
  invalids: [],
  handleChange: () => false,
});

import React from 'react';
import * as _ from 'lodash';
import {Cell as CellModel} from "../lib/ModelInterface";
import {Cell} from "./Cell";
import {AppContext} from "../AppContext";

type Props = {
  areaNum: number;
  cells: CellModel[];
};

export const Area: React.FC<Props> = ({areaNum, cells}) => {
  const {invalids} = React.useContext(AppContext);

  return (
    <div className={`area ${_.find(invalids, {area: areaNum}) ? 'error' : ''}`}>
      {_.sortBy(cells, ['x', 'y']).map((cell, i) => (
        <Cell key={i} cell={cell}/>
      ))}
    </div>
  )
};

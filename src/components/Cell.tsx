import React from 'react';
import * as _ from 'lodash';
import {Cell as CellModel} from "../lib/ModelInterface";
import {AppContext} from "../AppContext";

type Props = {
  cell: CellModel;
};

export const Cell: React.FC<Props> = ({cell}) => {
  const {handleChange, invalids} = React.useContext(AppContext);

  return (
    <div
      className={
        `cell ${_.find(invalids, (invalid) => (
          invalid.x === cell.x || invalid.y === cell.y
        )) ? 'error' : ''}`
      }
      data-x={cell.x}
      data-y={cell.y}
      data-area={cell.area}
    >
      <div className="selectWrap">
        <select
          className="select"
          value={cell.value}
          onChange={(e) => handleChange(cell.x, cell.y, e.target.value ? parseInt(e.target.value, 10) : undefined)}
        >
          <option value="">-</option>
          {_.range(1, 10).map((num, i) => (
            <option key={i} value={num}>{num}</option>
          ))}
        </select>
      </div>
    </div>
  )
};

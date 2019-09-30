import * as _ from 'lodash';
import {Field} from "./ModelInterface";

export const createInitialField = (): Field => {
  let range: number[] = _.range(1, 10);

  const field: Field = [];
  _.forEach(_.range(1, 10), (line, key) => {
    if (key) {
      range.push(range.shift() as number);
      range.push(range.shift() as number);
      range.push(range.shift() as number);
    }

    if (line === 4 || line === 7) {
      range.push(range.shift() as number);
    }
    _.forEach(range, (num, i) => {
      field.push({x: line, y: i + 1, area: getArea(line, i + 1), value: num})
    });
  });

  return shuffleField(field);
};

const ZoneMapping: number[][] = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

const shuffleField = (originalField: Field): Field => {
  let field: Field = originalField.slice();

  //const shuffleCount = _.random(1, 9);

  for(var i = 1; i <= 1; i++) {
    let targetZone = _.sample(ZoneMapping) as number[];

    console.log(JSON.stringify(targetZone));
    field = shuffle(field, targetZone);
  }

  return field;
};

const removeZoneFromField = (field: Field, zone: number[]) => {
  return _.filter(field, (cell) => (
    !zone.includes(cell.x)
  ));
};

const shuffle = (originalField: Field, zone: number[]) => {
  let newField = removeZoneFromField(originalField, zone);
  let shuffledZone = _.shuffle(zone.slice());

  _.forEach(zone, (axis, i) => {
    const cloneField = _.cloneDeep(originalField);

    const targetAxis = _.filter(cloneField, (cell) => {
      return cell.x === axis;
    });

    const changedAxis = targetAxis.map((cell) => {
      cell.x = shuffledZone[i] as number;

      return cell;
    });

    newField = newField.concat(changedAxis);
  });

  return newField;
};

type AreaMapping = {
  area: number;
  x: number[];
  y: number[];
};

const areaMappings: AreaMapping[] = [
  {area: 1, x: [1,2,3], y: [1,2,3]},
  {area: 2, x: [1,2,3], y: [4,5,6]},
  {area: 3, x: [1,2,3], y: [7,8,9]},
  {area: 4, x: [4,5,6], y: [1,2,3]},
  {area: 5, x: [4,5,6], y: [4,5,6]},
  {area: 6, x: [4,5,6], y: [7,8,9]},
  {area: 7, x: [7,8,9], y: [1,2,3]},
  {area: 8, x: [7,8,9], y: [4,5,6]},
  {area: 9, x: [7,8,9], y: [7,8,9]},
];

export const getArea = (x: number, y: number) => {
  const mappingIndex = _.findIndex(areaMappings, (mapping) => {
    return mapping.x.includes(x) && mapping.y.includes(y);
  });

  return areaMappings[mappingIndex].area
};

type AreaResult = {
  area: number;
  isInvalid: boolean;
}

export const calcArea = (field: Field): AreaResult[] => {
  return _.map(_.range(1, 10), (area) => {
    const values: number[] = [];

    _.forEach(field, (cell) => {
      if (cell.area === area) {
        values.push(cell.value || 0)
      }
    });

    const duplicate = values.filter((v, i ,self) => {
      return self.indexOf(v) !== self.lastIndexOf(v);
    });

    return {area: area, isInvalid: duplicate.length > 0}
  })
};

type XResult = {
  x: number;
  isInvalid: boolean;
}

export const calcX = (field: Field): XResult[] => {
  return _.map(_.range(1, 10), (x) => {
    const values: number[] = [];

    _.forEach(field, (cell) => {
      if (cell.x === x) {
        values.push(cell.value || 0)
      }
    });

    const duplicate = values.filter((v, i ,self) => {
      return self.indexOf(v) !== self.lastIndexOf(v);
    });

    return {x: x, isInvalid: duplicate.length > 0}
  })
};

type YResult = {
  y: number;
  isInvalid: boolean;
}

export const calcY = (field: Field): YResult[] => {
  return _.map(_.range(1, 10), (y) => {
    const values: number[] = [];

    _.forEach(field, (cell) => {
      if (cell.x === y) {
        values.push(cell.value || 0)
      }
    });

    const duplicate = values.filter((v, i ,self) => {
      return self.indexOf(v) !== self.lastIndexOf(v);
    });

    return {y: y, isInvalid: duplicate.length > 0}
  })
};

export type Invalid = {
  x?: number;
  y?: number;
  area?: number;
}

export const checkValid = (field: Field): Invalid[] => {
  const invalids: Invalid[] = [];
  const xResults = calcX(field);
  const yResults = calcY(field);
  const areaResults = calcArea(field);

  _.forEach(xResults, (record) => {
    if (record.isInvalid) {
      invalids.push({x: record.x});
    }
  });

  _.forEach(yResults, (record) => {
    if (record.isInvalid) {
      invalids.push({y: record.y});
    }
  });

  _.forEach(areaResults, (record) => {
    if (record.isInvalid) {
      invalids.push({area: record.area});
    }
  });
  return invalids
};

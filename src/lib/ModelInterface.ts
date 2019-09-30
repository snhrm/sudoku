export type Cell = {
  x: number;
  y: number;
  area: number;
  value?: number;
  [key: string]: number | undefined;
};

export type Field = Cell[];

export type Cell = {
  x: number;
  y: number;
  area: number;
  value?: number;
  isStatic: boolean;
  [key: string]: any;
};

export type Field = Cell[];

import { DisplayColumn } from './GridDisplay';
import { TableInfo } from '@dbgate/types';

export interface GridConfigColumns {
  hiddenColumns: string[];
  expandedColumns: string[];
  addedColumns: string[];
}

export interface GridConfig extends GridConfigColumns {
  filters: { [uniqueName: string]: string };
}

export interface GridCache {
  tables: { [uniqueName: string]: TableInfo };
  refreshTime: number;
}

export function createGridConfig(): GridConfig {
  return {
    hiddenColumns: [],
    expandedColumns: [],
    addedColumns: [],
    filters: {},
  };
}

export function createGridCache(): GridCache {
  return {
    tables: {},
    refreshTime: new Date().getTime(),
  };
}
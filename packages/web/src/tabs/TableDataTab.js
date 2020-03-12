import React from 'react';
import useFetch from '../utility/useFetch';
import styled from 'styled-components';
import theme from '../theme';
import DataGrid from '../datagrid/DataGrid';
import { TableGridDisplay, createGridConfig, createGridCache } from '@dbgate/datalib';
import useTableInfo from '../utility/useTableInfo';
import useConnectionInfo from '../utility/useConnectionInfo';
import engines from '@dbgate/engines';
import getTableInfo from '../utility/getTableInfo';

export default function TableDataTab({ conid, database, schemaName, pureName }) {
  const tableInfo = useTableInfo({ conid, database, schemaName, pureName });
  const [config, setConfig] = React.useState(createGridConfig());
  const [cache, setCache] = React.useState(createGridCache());
  const connection = useConnectionInfo(conid);
  if (!tableInfo || !connection) return null;
  const display = new TableGridDisplay(tableInfo, engines(connection), config, setConfig, cache, setCache, name =>
    getTableInfo({ conid, database, ...name })
  );
  return (
    <DataGrid
      // key={`${conid}, ${database}, ${schemaName}, ${pureName}`}
      conid={conid}
      database={database}
      display={display}
    />
  );
}
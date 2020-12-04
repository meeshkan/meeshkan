import React, {createContext} from 'react';

const TableContext = createContext<{ variant?: string }>({});

if (process.env.NODE_ENV !== 'production') {
  TableContext.displayName = 'TableContext';
}

export default TableContext;

import React from 'react';
import { Box } from '@pankod/refine-mui';
import { PCTFilterPane, FilterField } from './PCTFilterPane';

const PAGE_FILTERS: Record<string, { fields: FilterField[]; moreFields?: FilterField[] }> = {
  '/': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Asset/Program' },
      { label: 'Priority' },
      { label: 'Project Status' },
      { label: 'Project Phase' },
      { label: 'Disease/Indication' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }, { label: 'PM' }, { label: 'Launch Strategy' }],
  },
  '/project': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Asset/Program' },
      { label: 'Project Status' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }, { label: 'PM' }],
  },
  '/timeline': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Asset/Program' },
      { label: 'Priority' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }],
  },
  '/kips': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Asset/Program' },
      { label: 'Priority' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }, { label: 'PM' }],
  },
  '/milestones': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Priority' },
      { label: 'Project Phase' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }, { label: 'PM' }],
  },
  '/cost-fte': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Project Status' },
      { label: 'Project Phase' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }],
  },
  '/risks': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Risk Category' },
      { label: 'Project Phase' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }, { label: 'PM' }],
  },
  '/terminated': {
    fields: [
      { label: 'PPM Responsibility' },
      { label: 'TA Portfolio' },
      { label: 'Project Phase' },
    ],
    moreFields: [{ label: 'Project Name', value: '12345' }],
  },
};

const DEFAULT_FILTERS = PAGE_FILTERS['/'];

type PageWithFiltersProps = {
  pathname: string;
  children: React.ReactNode;
};

export const PageWithFilters: React.FC<PageWithFiltersProps> = ({ pathname, children }) => {
  const config = PAGE_FILTERS[pathname] || DEFAULT_FILTERS;

  return (
    <Box sx={{ display: 'flex', flex: 1, minWidth: 0 }}>
      <PCTFilterPane
        title="Filters"
        fields={config.fields}
        moreFields={config.moreFields}
        showLiveToggle
      />
      <Box sx={{ flex: 1, minWidth: 0, p: 3, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

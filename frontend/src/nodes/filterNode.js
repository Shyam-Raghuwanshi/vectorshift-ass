// filterNode.js - Demonstrates conditional logic node

import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const handleFieldChange = useCallback((key, val) => {
    if (key === 'condition') setCondition(val);
    if (key === 'value') setValue(val);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      color="orange"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' }
      ]}
      fields={[
        {
          type: 'select',
          key: 'condition',
          label: 'Condition',
          options: [
            { value: 'equals', label: 'Equals' },
            { value: 'contains', label: 'Contains' },
            { value: 'startsWith', label: 'Starts With' },
            { value: 'endsWith', label: 'Ends With' },
            { value: 'greaterThan', label: 'Greater Than' },
            { value: 'lessThan', label: 'Less Than' },
          ]
        },
        {
          type: 'text',
          key: 'value',
          label: 'Compare Value',
          placeholder: 'Enter value to compare...'
        }
      ]}
      fieldValues={{ condition, value }}
      onFieldChange={handleFieldChange}
    />
  );
};

// mergeNode.js - Demonstrates data merging node

import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeStrategy, setMergeStrategy] = useState(data?.mergeStrategy || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');

  const handleFieldChange = useCallback((key, val) => {
    if (key === 'mergeStrategy') setMergeStrategy(val);
    if (key === 'separator') setSeparator(val);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔀"
      color="pink"
      inputs={[
        { id: 'input1', label: 'Input 1' },
        { id: 'input2', label: 'Input 2' },
        { id: 'input3', label: 'Input 3' }
      ]}
      outputs={[{ id: 'merged', label: 'Merged' }]}
      fields={[
        {
          type: 'select',
          key: 'mergeStrategy',
          label: 'Strategy',
          options: [
            { value: 'concat', label: 'Concatenate' },
            { value: 'array', label: 'As Array' },
            { value: 'object', label: 'As Object' },
            { value: 'first', label: 'First Non-Empty' },
          ]
        },
        {
          type: 'text',
          key: 'separator',
          label: 'Separator',
          placeholder: 'Separator between values'
        }
      ]}
      fieldValues={{ mergeStrategy, separator }}
      onFieldChange={handleFieldChange}
    />
  );
};

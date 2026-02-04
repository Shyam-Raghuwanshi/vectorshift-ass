// outputNode.js

import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleFieldChange = useCallback((key, value) => {
    if (key === 'name') setCurrName(value);
    if (key === 'type') setOutputType(value);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      color="green"
      minWidth={240}
      inputs={[{ id: 'value' }]}
      outputs={[{ id: 'passthrough' }]}
      fields={[
        { 
          type: 'text', 
          key: 'name', 
          label: 'Name',
          placeholder: 'Enter output name...'
        },
        { 
          type: 'select', 
          key: 'type', 
          label: 'Type',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' },
          ]
        }
      ]}
      fieldValues={{ name: currName, type: outputType }}
      onFieldChange={handleFieldChange}
    />
  );
};

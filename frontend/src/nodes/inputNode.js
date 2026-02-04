// inputNode.js

import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';
import { FiDownload } from 'react-icons/fi';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleFieldChange = useCallback((key, value) => {
    if (key === 'name') setCurrName(value);
    if (key === 'type') setInputType(value);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={<FiDownload size={16} />}
      color="blue"
      outputs={[{ id: 'value', label: 'Output' }]}
      fields={[
        { 
          type: 'text', 
          key: 'name', 
          label: 'Name',
          placeholder: 'Enter input name...'
        },
        { 
          type: 'select', 
          key: 'type', 
          label: 'Type',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]
        }
      ]}
      fieldValues={{ name: currName, type: inputType }}
      onFieldChange={handleFieldChange}
    />
  );
};

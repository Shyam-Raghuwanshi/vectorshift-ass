// mathNode.js - Demonstrates mathematical operations node

import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';
import { FiPlusCircle } from 'react-icons/fi';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handleFieldChange = useCallback((key, val) => {
    if (key === 'operation') setOperation(val);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Math"
      icon={<FiPlusCircle size={16} />}
      color="teal"
      inputs={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' }
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
      fields={[
        {
          type: 'select',
          key: 'operation',
          label: 'Operation',
          options: [
            { value: 'add', label: 'Add (+)' },
            { value: 'subtract', label: 'Subtract (-)' },
            { value: 'multiply', label: 'Multiply (×)' },
            { value: 'divide', label: 'Divide (÷)' },
            { value: 'modulo', label: 'Modulo (%)' },
            { value: 'power', label: 'Power (^)' },
          ]
        }
      ]}
      fieldValues={{ operation }}
      onFieldChange={handleFieldChange}
    />
  );
};

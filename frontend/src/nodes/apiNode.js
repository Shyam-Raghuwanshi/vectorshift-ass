// apiNode.js - Demonstrates API request configuration node

import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const [timeoutVal, setTimeoutVal] = useState(data?.timeout || 30);

  const handleFieldChange = useCallback((key, val) => {
    if (key === 'method') setMethod(val);
    if (key === 'url') setUrl(val);
    if (key === 'timeout') setTimeoutVal(val);
  }, []);

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      color="indigo"
      inputs={[
        { id: 'body', label: 'Body' },
        { id: 'headers', label: 'Headers' }
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'status', label: 'Status' }
      ]}
      fields={[
        {
          type: 'select',
          key: 'method',
          label: 'Method',
          options: [
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' },
            { value: 'PATCH', label: 'PATCH' },
          ]
        },
        {
          type: 'text',
          key: 'url',
          label: 'URL',
          placeholder: 'https://api.example.com/endpoint'
        },
        {
          type: 'slider',
          key: 'timeout',
          label: 'Timeout (s)',
          min: 5,
          max: 120,
          step: 5
        }
      ]}
      fieldValues={{ method, url, timeout: timeoutVal }}
      onFieldChange={handleFieldChange}
      minWidth={280}
    />
  );
};

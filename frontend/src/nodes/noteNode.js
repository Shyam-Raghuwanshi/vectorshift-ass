// noteNode.js - Demonstrates a simple annotation/comment node

import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [content, setContent] = useState(data?.content || '');
  const [color, setColor] = useState(data?.color || 'yellow');

  const handleFieldChange = useCallback((key, val) => {
    if (key === 'content') setContent(val);
    if (key === 'color') setColor(val);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📌"
      color={color}
      fields={[
        {
          type: 'select',
          key: 'color',
          label: 'Color',
          options: [
            { value: 'yellow', label: '🟡 Yellow' },
            { value: 'blue', label: '🔵 Blue' },
            { value: 'green', label: '🟢 Green' },
            { value: 'pink', label: '🩷 Pink' },
            { value: 'orange', label: '🟠 Orange' },
          ]
        },
        {
          type: 'textarea',
          key: 'content',
          label: 'Note',
          placeholder: 'Write your note here...',
          rows: 4
        }
      ]}
      fieldValues={{ content, color }}
      onFieldChange={handleFieldChange}
      minWidth={240}
    />
  );
};

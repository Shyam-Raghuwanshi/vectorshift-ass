// textNode.js

import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import styles from './NodeStyles.module.css';

// Regex to match valid JavaScript variable names in double curly braces
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

// Helper function to extract variables - defined outside component
const extractVariables = (text) => {
  const matches = [...text.matchAll(VARIABLE_REGEX)];
  return [...new Set(matches.map(match => match[1]))];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  
  // Extract variables directly (no useMemo to avoid dependency issues)
  const variables = extractVariables(currText);

  const handleTextChange = useCallback((e) => {
    setCurrText(e.target.value);
  }, []);

  // Calculate dynamic height based on text and variables
  const baseHeight = 140;
  const variableHeight = variables.length * 28;
  const minHeight = baseHeight + variableHeight;

  return (
    <div 
      className={`${styles.baseNode} ${styles.nodeYellow}`}
      style={{ 
        minWidth: 280,
        minHeight,
      }}
    >
      {/* Variable Handles - positioned below content */}
      {variables.map((variable, idx) => (
        <div 
          key={variable}
          className={styles.variableHandle}
          style={{ 
            top: baseHeight + (idx * 28) + 10,
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            className={`${styles.handle} ${styles.handleTarget}`}
            style={{ background: '#8b5cf6' }}
          />
          <span className={styles.variableLabel}>{variable}</span>
        </div>
      ))}

      {/* Header */}
      <div className={styles.nodeHeader}>
        <span className={styles.nodeIcon}>📝</span>
        <span className={styles.nodeTitle}>Text</span>
      </div>

      {/* Content */}
      <div className={styles.nodeContent}>
        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel}>Text Content</label>
          <textarea
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text... Use {{variableName}} for variables"
            className={`${styles.textArea} nodrag`}
            rows={3}
          />
        </div>
        {variables.length > 0 && (
          <div style={{ 
            fontSize: '11px', 
            color: '#6b7280',
            paddingTop: '4px',
            borderTop: '1px solid #e5e7eb',
            marginTop: '4px'
          }}>
            <strong>Variables:</strong> {variables.join(', ')}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className={`${styles.handle} ${styles.handleSource}`}
        style={{ top: '50%' }}
      />
    </div>
  );
};

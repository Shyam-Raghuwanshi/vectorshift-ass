// BaseNode.js - Node Abstraction Component

import { useCallback, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import styles from './NodeStyles.module.css';

// Default empty arrays/objects defined outside component to maintain referential equality
const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

// Field type components - using fieldKey and onFieldChange to avoid creating new functions
const TextField = ({ id, label, value, fieldKey, onFieldChange, placeholder }) => {
  const handleChange = useCallback((e) => {
    if (onFieldChange) onFieldChange(fieldKey, e.target.value);
  }, [fieldKey, onFieldChange]);

  return (
    <div className={styles.fieldContainer}>
      {label && <label className={styles.fieldLabel}>{label}</label>}
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.textInput} nodrag`}
      />
    </div>
  );
};

const TextAreaField = ({ id, label, value, fieldKey, onFieldChange, placeholder, rows = 3 }) => {
  const handleChange = useCallback((e) => {
    if (onFieldChange) onFieldChange(fieldKey, e.target.value);
  }, [fieldKey, onFieldChange]);

  return (
    <div className={styles.fieldContainer}>
      {label && <label className={styles.fieldLabel}>{label}</label>}
      <textarea
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={`${styles.textArea} nodrag`}
      />
    </div>
  );
};

const SelectField = ({ id, label, value, fieldKey, onFieldChange, options = [] }) => {
  const handleChange = useCallback((e) => {
    if (onFieldChange) onFieldChange(fieldKey, e.target.value);
  }, [fieldKey, onFieldChange]);

  return (
    <div className={styles.fieldContainer}>
      {label && <label className={styles.fieldLabel}>{label}</label>}
      <select
        value={value || ''}
        onChange={handleChange}
        className={`${styles.selectInput} nodrag`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const NumberField = ({ id, label, value, fieldKey, onFieldChange, min, max, step }) => {
  const handleChange = useCallback((e) => {
    if (onFieldChange) onFieldChange(fieldKey, parseFloat(e.target.value) || 0);
  }, [fieldKey, onFieldChange]);

  return (
    <div className={styles.fieldContainer}>
      {label && <label className={styles.fieldLabel}>{label}</label>}
      <input
        type="number"
        value={value ?? 0}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className={`${styles.numberInput} nodrag`}
      />
    </div>
  );
};

const SliderField = ({ id, label, value, fieldKey, onFieldChange, min = 0, max = 100, step = 1 }) => {
  const handleChange = useCallback((e) => {
    if (onFieldChange) onFieldChange(fieldKey, parseFloat(e.target.value));
  }, [fieldKey, onFieldChange]);

  return (
    <div className={styles.fieldContainer}>
      {label && <label className={styles.fieldLabel}>{label}: {value}</label>}
      <input
        type="range"
        value={value ?? min}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className={`${styles.sliderInput} nodrag`}
      />
    </div>
  );
};

const CheckboxField = ({ id, label, value, fieldKey, onFieldChange }) => {
  const handleChange = useCallback((e) => {
    if (onFieldChange) onFieldChange(fieldKey, e.target.checked);
  }, [fieldKey, onFieldChange]);

  return (
    <div className={styles.fieldContainerRow}>
      <input
        type="checkbox"
        checked={value || false}
        onChange={handleChange}
        className={`${styles.checkbox} nodrag`}
      />
      {label && <label className={styles.fieldLabel}>{label}</label>}
    </div>
  );
};

// Field renderer mapping
const FIELD_COMPONENTS = {
  text: TextField,
  textarea: TextAreaField,
  select: SelectField,
  number: NumberField,
  slider: SliderField,
  checkbox: CheckboxField,
};

// Handle component with tooltip
const NodeHandle = ({ type, position, id, label, style }) => {
  const isTarget = type === 'target';
  const isLeft = position === Position.Left;
  
  return (
    <div 
      className={styles.handleWrapper} 
      style={{
        ...style,
        transform: 'translateY(-50%)',
        [isLeft ? 'left' : 'right']: '-6px',
      }}
    >
      <Handle
        type={type}
        position={position}
        id={id}
        className={`${styles.handle} ${isTarget ? styles.handleTarget : styles.handleSource}`}
      />
      {label && (
        <span 
          className={styles.handleLabel}
          style={{
            [isLeft ? 'left' : 'right']: '18px',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * BaseNode - Flexible node abstraction component
 * 
 * @param {Object} props
 * @param {string} props.id - Node ID
 * @param {string} props.title - Node title
 * @param {string} props.icon - Icon emoji or character
 * @param {string} props.color - Theme color (default: 'default')
 * @param {Array} props.inputs - Array of input handle configs {id, label, style}
 * @param {Array} props.outputs - Array of output handle configs {id, label, style}
 * @param {Array} props.fields - Array of field configs {type, key, label, ...fieldProps}
 * @param {Object} props.fieldValues - Object containing field values
 * @param {Function} props.onFieldChange - Callback for field changes (key, value) => void
 * @param {React.ReactNode} props.children - Custom content
 * @param {Object} props.style - Custom styles
 * @param {string} props.className - Additional class names
 * @param {number} props.minWidth - Minimum width (default: 200)
 * @param {number} props.minHeight - Minimum height (default: auto)
 */

export const BaseNode = ({
  id,
  title,
  icon,
  color = 'default',
  inputs,
  outputs,
  fields,
  fieldValues,
  onFieldChange,
  children,
  style,
  className = '',
  minWidth = 220,
  minHeight,
}) => {
  // Use stable defaults
  const safeInputs = inputs || EMPTY_ARRAY;
  const safeOutputs = outputs || EMPTY_ARRAY;
  const safeFields = fields || EMPTY_ARRAY;
  const safeFieldValues = fieldValues || EMPTY_OBJECT;
  const safeStyle = style || EMPTY_OBJECT;

  // Calculate handle positions for multiple inputs/outputs
  const getHandleStyle = useCallback((index, total) => {
    if (total === 1) return { top: '50%' };
    const percentage = ((index + 1) / (total + 1)) * 100;
    return { top: `${percentage}%` };
  }, []);

  const colorClass = useMemo(() => 
    styles[`node${color.charAt(0).toUpperCase() + color.slice(1)}`] || styles.nodeDefault,
    [color]
  );

  return (
    <div 
      className={`${styles.baseNode} ${colorClass} ${className}`}
      style={{ 
        minWidth, 
        minHeight,
        ...safeStyle 
      }}
    >
      {/* Input Handles */}
      {safeInputs.map((input, idx) => (
        <NodeHandle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          label={input.label}
          style={input.style || getHandleStyle(idx, safeInputs.length)}
        />
      ))}

      {/* Header */}
      <div className={styles.nodeHeader}>
        {icon && <span className={styles.nodeIcon}>{icon}</span>}
        <span className={styles.nodeTitle}>{title}</span>
      </div>

      {/* Content */}
      <div className={styles.nodeContent}>
        {/* Dynamic Fields */}
        {safeFields.map((field) => {
          const FieldComponent = FIELD_COMPONENTS[field.type];
          if (!FieldComponent) return null;
          
          return (
            <FieldComponent
              key={field.key}
              id={`${id}-${field.key}`}
              label={field.label}
              value={safeFieldValues[field.key]}
              fieldKey={field.key}
              onFieldChange={onFieldChange}
              {...field}
            />
          );
        })}

        {/* Custom Children */}
        {children}
      </div>

      {/* Output Handles */}
      {safeOutputs.map((output, idx) => (
        <NodeHandle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          label={output.label}
          style={output.style || getHandleStyle(idx, safeOutputs.length)}
        />
      ))}
    </div>
  );
};

// Export field components for custom usage
export { TextField, TextAreaField, SelectField, NumberField, SliderField, CheckboxField };

export default BaseNode;

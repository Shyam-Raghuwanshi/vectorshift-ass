// llmNode.js

import { BaseNode } from './BaseNode';
import styles from './NodeStyles.module.css';
import { FiCpu } from 'react-icons/fi';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={<FiCpu size={16} />}
      color="purple"
      minWidth={280}
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' }
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <p className={styles.staticText}>
        A Large Language Model node that processes system instructions and prompts to generate responses.
      </p>
    </BaseNode>
  );
};

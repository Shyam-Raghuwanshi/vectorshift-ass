// submit.js

import { useStore } from './store';
import './Submit.css';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Create a user-friendly alert message
            const dagStatus = data.is_dag 
                ? '✅ Yes - This is a valid DAG' 
                : '❌ No - Contains cycles';
            
            const message = `
Pipeline Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━

📊 Nodes: ${data.num_nodes}
🔗 Edges: ${data.num_edges}
🔄 Is DAG: ${dagStatus}
            `.trim();

            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend server is running on http://localhost:8000`);
        }
    };

    return (
        <div className="submit-container">
            <button 
                type="button" 
                className="submit-button"
                onClick={handleSubmit}
            >
                Submit Pipeline
            </button>
            <span className="submit-hint">
                {nodes.length} nodes, {edges.length} edges
            </span>
        </div>
    );
};

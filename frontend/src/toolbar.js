// toolbar.js

import { DraggableNode } from './draggableNode';
import './Toolbar.css';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <h1 className="toolbar-title">
                    <span className="toolbar-logo">⚡</span>
                    Pipeline Builder
                </h1>
            </div>
            <div className="toolbar-nodes">
                <div className="node-group">
                    <span className="group-label">Core</span>
                    <div className="node-items">
                        <DraggableNode type='customInput' label='Input' icon='📥' />
                        <DraggableNode type='customOutput' label='Output' icon='📤' />
                        <DraggableNode type='text' label='Text' icon='📝' />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">AI</span>
                    <div className="node-items">
                        <DraggableNode type='llm' label='LLM' icon='🤖' />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Logic</span>
                    <div className="node-items">
                        <DraggableNode type='filter' label='Filter' icon='🔍' />
                        <DraggableNode type='math' label='Math' icon='🧮' />
                        <DraggableNode type='merge' label='Merge' icon='🔀' />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Integration</span>
                    <div className="node-items">
                        <DraggableNode type='api' label='API' icon='🌐' />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Utility</span>
                    <div className="node-items">
                        <DraggableNode type='note' label='Note' icon='📌' />
                    </div>
                </div>
            </div>
        </div>
    );
};

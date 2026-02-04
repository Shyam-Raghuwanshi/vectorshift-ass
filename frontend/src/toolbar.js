// toolbar.js

import { DraggableNode } from './draggableNode';
import './Toolbar.css';
import { 
    FiDownload, 
    FiUpload, 
    FiFileText, 
    FiCpu, 
    FiFilter, 
    FiPlusCircle, 
    FiGitMerge, 
    FiGlobe, 
    FiBookmark,
    FiZap
} from 'react-icons/fi';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <h1 className="toolbar-title">
                    <span className="toolbar-logo"><FiZap size={20} /></span>
                    Pipeline Builder
                </h1>
            </div>
            <div className="toolbar-nodes">
                <div className="node-group">
                    <span className="group-label">Core</span>
                    <div className="node-items">
                        <DraggableNode type='customInput' label='Input' icon={<FiDownload size={16} />} />
                        <DraggableNode type='customOutput' label='Output' icon={<FiUpload size={16} />} />
                        <DraggableNode type='text' label='Text' icon={<FiFileText size={16} />} />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">AI</span>
                    <div className="node-items">
                        <DraggableNode type='llm' label='LLM' icon={<FiCpu size={16} />} />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Logic</span>
                    <div className="node-items">
                        <DraggableNode type='filter' label='Filter' icon={<FiFilter size={16} />} />
                        <DraggableNode type='math' label='Math' icon={<FiPlusCircle size={16} />} />
                        <DraggableNode type='merge' label='Merge' icon={<FiGitMerge size={16} />} />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Integration</span>
                    <div className="node-items">
                        <DraggableNode type='api' label='API' icon={<FiGlobe size={16} />} />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Utility</span>
                    <div className="node-items">
                        <DraggableNode type='note' label='Note' icon={<FiBookmark size={16} />} />
                    </div>
                </div>
            </div>
        </div>
    );
};

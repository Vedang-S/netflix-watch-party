import React, { useState } from 'react';
import './CreatePollModal.css';

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const PLACEHOLDERS = [
  'Option 1 (e.g., Action Movie)',
  'Option 2 (e.g., Comedy)',
  'Option 3 (e.g., Documentary)',
];

export default function CreatePollModal({ isOpen, onClose, onCreatePoll }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [allowMultiple, setAllowMultiple] = useState(false);

  if (!isOpen) return null;

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, '']);
  };

  const handleRemoveOption = (indexToRemove) => {
    if (options.length <= 2) return; // Keep at least 2 options
    setOptions((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const validOptions = options.map((opt) => opt.trim()).filter(Boolean);
    if (validOptions.length < 2) return;

    onCreatePoll?.({
      question: question.trim(),
      options: validOptions,
      allowMultiple,
    });

    onClose();
  };

  return (
    <div className="cpm-backdrop" onClick={onClose}>
      <div className="cpm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cpm-header">
          <h2 className="cpm-title">Create a Poll</h2>
          <button className="cpm-close-btn" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cpm-body">
          {/* Question Field */}
          <div className="cpm-field">
            <label className="cpm-label">Question</label>
            <input
              type="text"
              className="cpm-input"
              placeholder="e.g., What should we watch next"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Options Field */}
          <div className="cpm-field">
            <label className="cpm-label">Options</label>
            <div className="cpm-options-list">
              {options.map((opt, idx) => (
                <div key={idx} className="cpm-option-row">
                  <input
                    type="text"
                    className="cpm-input"
                    placeholder={PLACEHOLDERS[idx] || `Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      className="cpm-trash-btn"
                      onClick={() => handleRemoveOption(idx)}
                      aria-label="Remove option"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="cpm-add-btn" onClick={handleAddOption}>
              <span>+</span> Add option
            </button>
          </div>

          {/* Toggle Setting */}
          <div className="cpm-toggle-row">
            <span className="cpm-toggle-label">Allow multiple answers</span>
            <label className="cpm-switch">
              <input
                type="checkbox"
                checked={allowMultiple}
                onChange={(e) => setAllowMultiple(e.target.checked)}
              />
              <span className="cpm-slider" />
            </label>
          </div>

          {/* Footer Actions */}
          <div className="cpm-footer">
            <button type="button" className="cpm-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="cpm-create-btn">
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
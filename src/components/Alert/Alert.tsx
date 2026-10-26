'use client';

import React from 'react';
import './styles.css';

export interface AlertProps {
  text: string;
  onClick: () => void;
  buttonText?: string;
}

export function Alert({ text, onClick, buttonText = 'OK' }: AlertProps) {
  return (
    <div className="alert-overlay" role="presentation">
      <div
        className="alert-box"
        role="alertdialog"
        aria-modal="true"
        aria-describedby="alert-message"
      >
        <p id="alert-message" className="alert-message">
          {text}
        </p>
        <div className="alert-actions">
          <button type="button" className="alert-button" onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;


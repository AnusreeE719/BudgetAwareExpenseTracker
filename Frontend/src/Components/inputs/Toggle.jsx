import React from 'react';

const Toggle = ({ label, name, value, onChange }) => {
  const handleClick = () => {
    // Pass the new value back to parent form
    onChange(name, !value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', }}>
      {label && <label htmlFor={name} className="font-poppins font-bold text-gray-600">{label}</label>}
      <button
        type="button"
        id={name}
        onClick={handleClick}
        style={{
          width: '60px',
          height: '30px',
          borderRadius: '15px',
          border: 'none',
          backgroundColor: value ? '#5093F8' : '#ccc',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: value ? '32px' : '3px',
            width: '24px',
            height: '24px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            transition: 'left 0.3s ease',
          }}
        />
      </button>
      <span>{value ? 'True' : 'False'}</span>
    </div>
  );
};



export default Toggle;

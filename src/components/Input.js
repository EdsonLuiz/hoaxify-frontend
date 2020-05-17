import React from 'react'

const Input = (props) => {
  const {label, type, placeholder, value, onChange, hasError, error} = props

  let inputClassName = 'form-control'

  if(hasError !== undefined) {
    inputClassName += hasError ? ' is-invalid' : ' is-valid'
  }

  return (
    <div>
      {label && <label htmlFor="">{label}</label>}
      <input 
        className={inputClassName}
        type={type || 'text'} 
        placeholder={placeholder} 
        value={value} 
        onChange={e => onChange(e.target.value)}/>
      {hasError &&
        <span className="invalid-feedback">{error}</span>
      }
    </div>
  )
}

export default Input

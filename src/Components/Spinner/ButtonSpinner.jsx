
import React from 'react'
import SpinnerComponent from './Spinner'
import ButtonComponent from 'Components/Button/Button'

const ButtonSpinner = ({ title, className, spinner_width_height }) => {

  return (
    <ButtonComponent
      type="button"
      className={`w-100 ${className ? className : 'btn-primary py-2'} rounded-3`}
      buttonName={
        <div className='row align-items-center'>
          <div className='col text-start'>
            {title || 'Loading...'}
          </div>
          <div className='border-start text-center' style={{ width: '5rem' }}>
            <SpinnerComponent spinner_width_height={spinner_width_height} />
          </div>
        </div>
      }
      btnDisable={true}
    />
  )
}

export default ButtonSpinner
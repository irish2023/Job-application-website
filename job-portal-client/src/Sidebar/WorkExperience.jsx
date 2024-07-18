import React from 'react'
import InputField from '../components/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
        <h4 className='font-medium text-lg mb-2'>Work Experience</h4>
        <div>

        
        <label className='sidebar-label-container'>
          <input type="radio" name="test" id="test" value='' onChange={handleChange} />
          <span className='checkmark'></span>Any Experience
        </label>
        <InputField handleChange={handleChange} value='Internship' title='Internship' name='test' />
        <InputField handleChange={handleChange} value='Work remotely' title='Work remotely' name='test' />
      
        </div>
      </div>
  )
}

export default WorkExperience
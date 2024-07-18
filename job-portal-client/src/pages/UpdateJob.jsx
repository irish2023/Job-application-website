import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import { useLoaderData, useParams } from 'react-router-dom'

const UpdateJob = () => {
    const {id} = useParams();
    console.log(id)
    const{_id,experienceLevel, jobLocation, maxPrice, minPrice,companyName, salaryType, employmentType,
         postingDate, jobTitle, companyLogo, description,skills, postedBy} = useLoaderData()


         const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit,reset, formState: { errors } } = useForm();

  const onSubmit = (data) => { data.skills = selectedOption;
    axios.put(`http://localhost:9000/update-job/${id}`, data)
  .then(res =>  console.log(res.data));
      alert("job updated sucessfully!!!");
    
    }

  
//console.log(result)
  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "React", label: "React" }
  ]


         return (
          <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>UpdateJob
            {/* form */}
            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* 1st row */}
                <div className='create-job-flex'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>JobTitle </label>
                    <input defaultValue={jobTitle} {...register("jobTitle")} className='block w-full flex-1 border-1
                   bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Company Name </label>
                    <input placeholder='Ex: Microsoft'defaultValue={companyName} {...register("companyName")} className='block w-full flex-1 border-1
                   bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
      
                {/*2nd row */}
                <div className='create-job-flex'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Minimum Salary </label>
                    <input placeholder='$20k'defaultValue={minPrice} {...register("minPrice")} className='block w-full flex-1 border-1
                   bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Maximum Salary </label>
                    <input placeholder='$120k' defaultValue={maxPrice} {...register("maxPrice")} className='block w-full flex-1 border-1
                   bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
      
                {/* 3rd row */}
                <div className='create-job-flex'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Salary Type </label>
                    <select {...register("salaryType", { required: true })} className='create-job-input' >
                      <option value={salaryType}>{salaryType}</option>
                      <option value="Hourly">Hourly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'> Job Locations </label>
                    <input placeholder='Ex: New York' defaultValue={jobLocation} {...register("jobLocation")} className='block w-full flex-1 border-1
                   bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
      
                {/* 4th row */}
                <div className='create-job-flex'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'> Job Posting Date</label>
                    <input type='date' placeholder='Ex: 03-25-2023' defaultValue={postingDate} {...register("postingDate")} className='create-job-input' />
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Experience Level </label>
                    <select {...register("experienceLevel")} className='create-job-input' >
                      <option value={experienceLevel}>{experienceLevel}</option>
                      <option value="NoExperience">No Experience</option>
                      <option value="Internship">Internship</option>
                      <option value="Junior-Developer">Junior Developer</option>
                      <option value="midLevel">Mid Level</option>
                      <option value="SeniorDeveloper">Senior Developer</option>
                    </select>
                  </div>
      
                </div>
      
                {/*5th row */}
                <div>
                  <label className='block mb-2 text-lg'> Required a skill sets</label>
                  <CreatableSelect defaultValue={skills}
                    onChange={setSelectedOption}
                    options={options}
                    isMulti className='create-job-input py-4' />
                </div>
      
                {/*6th row */}
                <div className='create-job-flex'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'> Company Logo</label>
                    <input type='url' placeholder='Paste your image url: https://weshare.com/img1/jpg' defaultValue={companyLogo} {...register("companyLogo")} className='create-job-input' />
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Employment Type </label>
                    <select placeholder="select your job type" {...register("employmentType")} className='create-job-input' >
                      <option value={employmentType}>{employmentType}</option>
                      <option value="Full-time">Full Time</option>
                      <option value="Part-time">Part Time</option>
                      <option value="Temporary">Temporary</option>
      
                    </select>
                  </div>
      
                </div>
      
                {/*7th row */}
      
                <div className='w-full'>
                  <label className='block mb-2 text-lg '>Job Desciption</label>
                  <textarea placeholder='Job Description'
                    defaultValue={description}
                    rows={6} {...register("description")} className='w-full pl-3 py-1.5 focus:outline-none 
                   placeholder:text-gray-700' />
                </div>
                {/*last row */}
                <div className='w-full'>
                  <label className='block mb-2 text-lg '>Job Posted By</label>
                  <input type='email' placeholder=' your email'defaultValue={postedBy} {...register("postedBy")} className='create-job-input' />
      
                </div>
      
               
                <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 
                rounded-full cursor-pointer' />
              </form>
            </div>
          </div>
        )
      }

export default UpdateJob
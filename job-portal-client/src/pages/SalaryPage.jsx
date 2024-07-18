import React, { useEffect } from 'react'
import { useState } from 'react';
import PageHeader from '../components/PageHeader'
import axios from 'axios';

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);


  useEffect(() => {
    //fetch("salary.json")
    // .then(res => res.json()).then(data => setSalary(data))

    axios.get("salary.json")
      .then(res => setSalary(res.data))
    //console.log(salary)
  }, [searchText])

  const handleClick = () => {
    const filter = salary.filter((job) => job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    console.log(filter)
    setSalary(filter)
  }

  console.log(searchText)
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <PageHeader title={'Estimate Salary'} path={'Salary'} />
      <div className='text-center p-2 mb-2 mt-5 search-boc'>

        <input type="text" name="search" id="search" className='border py-2 pl-3 focus:outline-none lg:w-6/12 mb-4 w-full' onChange={(e) => { setSearchText(e.target.value) }} />
        <button type="submit" className='bg-blue text-white font-semibold py-2 px-8' onClick={handleClick} >search</button>
      </div>
      {/* salary dispaly card */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 items-center'>
      {
        salary.map((data) => (
          <div key={data.id} className=' shadow px-4 py-8'>
            <h4 className=' font-semibold text-xl'> {data.title}  </h4>
         <p className='text-blue my-2 font-medium'>{data.salary}</p>
         <div className='flex flex-wrap gap-4'>
          <a href='/' className='underline'>{data.status}</a>
          <a href='/' className='underline'>{data.skills}</a>
         </div>
          </div>))
      }
      </div>
    </div>
  )
}

export default SalaryPage
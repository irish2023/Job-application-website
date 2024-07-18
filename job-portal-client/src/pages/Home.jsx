import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Cards from '../components/Cards';
import Jobs from './Jobs';
import Sidebar from '../Sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:9000/all-job').then(res => res.json()).then(data => { setJobs(data); setIsLoading(false); })
  }, [])
  // handle input change
  const [query, setQuery] = useState("");
  const handleQueryChange = (event) => {
    setQuery(event.target.value)

  }

  // filter job by title
  const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)

  // .....................Radio Filtering....................//
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  // .....................Button based Filtering.....................//
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }

  console.log((currentPage -1 )* itemsPerPage)
  console.log(itemsPerPage)
  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  // function for previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // main functions
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // filtering input items
    if (query) {
      filteredJobs = filteredItems
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(({ experienceLevel, jobLocation, maxPrice, salaryType, employmentType, postingDate }) => (postingDate >= selected ||
        jobLocation === selected || experienceLevel === selected || maxPrice <= selected || salaryType === selected  || employmentType === selected)) }

    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex)
    return filteredJobs.map((data, index) => (<Cards  key={index} data={data} />))
  }

  const result = filteredData(jobs, selectedCategory, query);
  return (
    <div> <Banner query={query} handleQueryChange={handleQueryChange} />
      <div className=' bg-[#FAFAFA] md: grid grid-cols-4 gap-3 lg:px-24 px-4  py-12'>
        {/* Left Side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* Job cards */}
        <div className='col-span-2 bg-white p-4 rounded'>
          {
            isLoading ? <p className='font-medium'> Loading....</p> : result.length > 0 ? <Jobs result={result} />
              : <div> <h3 className='font-bold text-lg mb-2'> {result.length} Jobs </h3> <p> No data found! </p> </div>
          }


          {/*pagination is here */}
          {
            result.length > 0 ? (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick= {prevPage} disabled={currentPage === 1} className='hover:underline'> Previous </button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length /
                  itemsPerPage)} className='hover:underline'>Next</button>
              </div>
            ) : ""
          }

        </div>
        {/* Right Side */}
        <div className='bg-white p-4 rounded'> <Newsletter/>    </div>



          








      </div>
    </div>
  )
}

export default Home





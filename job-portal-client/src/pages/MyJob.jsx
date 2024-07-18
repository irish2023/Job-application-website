import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"





const MyJob = () => {
  //const email = "bello.azeez2022@gmail.com"
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const[currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 4

  // calculate Pagination
  const indeOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indeOfLastItem - itemsPerPage;
  const currentJob = jobs.slice(indexOfFirstItem,indeOfLastItem);

  // next btn & prev btn
  const nextPage = ()=>{
    if(indeOfLastItem < jobs.length){
      setCurrentPage(currentPage + 1)
    }
  }

const prevPage = () =>{
  if(currentPage > 1){
    setCurrentPage(currentPage - 1)
  }
}


  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:9000/myJobs/bello.azeez2022@gmail.com`)
      .then(res => { setJobs(res.data) })
    setIsLoading(false);
  }, [])


  const handleDelete = (id) => {

    setIsLoading(true)
    axios.delete(`http://localhost:9000/Job/${id}`)
      .then(() => {
        setIsLoading(false);
        alert("deleted sucessfully!");
      })
  }
  const handleSearchText = () => {
    const filter = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    setJobs(filter)
    console.log(filter);
    setIsLoading(false)
  }

  //console.log(searchText)

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='my-jobs-container'>
        <h1 className='text-center p-4'>ALL MY JOBS</h1>
        MyJob: {jobs.length}
        <div className='text-center p-2 mb-2 items-center'>

          <input type="text" name="search" id="search" onChange={(e) => { setSearchText(e.target.value) }} className=' flex-1 border bg-white py-2 pl-3 text-gray-900
       focus:outline-none lg:w-6/12 mb-2 w-full'  />
          <button type="submit" className='bg-blue text-white font-semibold py-2 px-8' onClick={handleSearchText} >search</button>
        </div>
      </div>
      {/* table goes in here */}

      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/post-job" >
                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none
                      focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post A New Job</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      TITLE
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      COMPANY NAME
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      SALARY
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      EDIT
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      DELETE
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    currentJob.map((job, index) => (<tr>
                      <th key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {job.jobTitle}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {job.companyName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        ${job.minPrice} - ${job.maxPrice}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button><Link to={`/edit-job/${job?._id}`} >Edit</Link></button>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button className=' text-white bg-red-700 py-2 px-8' onClick={() => handleDelete(job._id)} >Delete</button>
                      </td>
                    </tr>))
                  }

                </tbody>

              </table>
            </div>
          </div>
        </div>
        {/*<footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                </div>
              </div>
            </div>
          </div>
        </footer> */}

        <div className='flex justify-center text-black space-x-8'>
          {
            currentPage > 1 && (<button className='hover:underline' onClick={prevPage}>Previous</button>)
          }
          {
            indeOfLastItem < jobs.length && (<button className='hover:underline' onClick={nextPage}>Next</button>)
          }
        </div>
      </section>

    </div>
  )

}

export default MyJob
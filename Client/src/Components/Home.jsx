import React from 'react'

function Home() {
  return (
    <div className='bg-green-100 w-screen h-screen'>
      <div className='flex flex-col w-screen h-screen justify-center items-center'>
        <div>
            <h2 className='font-bold text-2xl'>TODO-List</h2>
        </div>
        <div className='flex gap-3' >
            <input type="text" placeholder='Enter todo'className='w-64 p-2 outline-none border border-blue-300 rounded-md'></input>
            <button className='bg-green-600 text-white px-4 rounded-md '>Add</button>
            </div>
           <div>
           <div>
                <p className='text-lg font-semibold' >Buy Rice</p>
                <p className='text-sm text-gray-600'>10/12/2024 10:30</p>
                <p className='text-sm text-gray-600'>Status : Active</p>
            </div>
           </div>
      </div>
    </div>
  )
}

export default Home

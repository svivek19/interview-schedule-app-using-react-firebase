import React from 'react';
import FormInput from './component/forms/FormInput';
import FormTextArea from './component/forms/FormTextArea';

const App = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <header className='bg-amber-500 px-10 py-5 text-center font-semibold'>Interview Scheduled Candidates</header>
      <main className='container mx-auto my-5'>
        <section className='bg-white p-5 rounded shadow'>
          <h2 className='font-semibold text-lg'>Interview Scheduled Candidates</h2>
          <form className='space-y-4 mt-5'>
            <div>
              <select name="jobRole" id="jobRole" className='px-4 py-2 bg-gray-100 rounded w-full'>
                <option value="">--Select Job--</option>
                <option value="ui-developer">Front-End Developer</option>
                <option value="backend-developer">Back-End Developer</option>
                <option value="database-developer">Database Developer</option>
                <option value="fullstack-developer">Fullstack Developer</option>
              </select>
            </div>
            <FormInput placeholder="Full name" />
            <FormInput placeholder="Email" />
            <FormTextArea placeholder="Address" />
            <FormTextArea placeholder="Qualification" />
            <FormTextArea placeholder="Comments" />
            <button className='px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white'>Submit</button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App

import './App.css';

import { useState } from 'react';

import { store } from './datasource';

function App() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const handleSubmit = e => {
    e.preventDefault();
    if (!e.target[0]?.files[0]) return;

    const files = e.target[0].files;
    for (let index = 0; index < files.length; index++) {
      const uploadTask = store.uploadImage(files[index]);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        error => {
          alert(error);
        },
        () => {
          store.getImageUrl(uploadTask.snapshot.ref).then(downloadURL => {
            setImgUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className='App mt-5'>
      <form onSubmit={handleSubmit} className='form'>
        {/* <input type="file" multiple /> */}
        <div class='flex justify-center items-center w-[450px] m-auto'>
          <label
            for='dropzone-file'
            class='flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div class='flex flex-col justify-center items-center pt-5 pb-6'>
              <svg
                aria-hidden='true'
                class='mb-3 w-10 h-10 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                ></path>
              </svg>
              <p class='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span class='font-semibold'>Click to upload</span> or drag and
                drop
              </p>
              <p class='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG or GIF
              </p>
            </div>
            <input id='dropzone-file' type='file' multiple class='hidden' />
          </label>
        </div>
        <button
          type='submit'
          className='mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            Upload
          </span>
        </button>
      </form>
      {!imgUrl && (
        <div className='w-[450px] m-auto mt-5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
          <div
            className='bg-blue-600 h-2.5 rounded-full'
            style={{ width: `${progresspercent}%` }}
          ></div>
        </div>
      )}
      {imgUrl && (
        <img src={imgUrl} alt='uploaded file' height={200} className='m-auto' />
      )}
    </div>
  );
}

export default App;

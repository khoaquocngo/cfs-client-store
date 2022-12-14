import './App.css';

import { useState } from 'react';

import { getImageUrl, uploadImage } from './datasource';

function App() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const handleSubmit = e => {
    e.preventDefault();
    if (!e.target[0]?.files[0]) return;

    const files = e.target[0].files;
    for (let index = 0; index < files.length; index++) {
      const uploadTask = uploadImage(files[index]);

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
          getImageUrl(uploadTask.snapshot.ref).then(downloadURL => {
            setImgUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div>
      <div className='App'>
        <form onSubmit={handleSubmit} className='form'>
          <input type='file' multiple />
          <button type='submit'>Upload</button>
        </form>
        {!imgUrl && (
          <div className='outerbar'>
            <div className='innerbar' style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )}
        {imgUrl && <img src={imgUrl} alt='uploaded file' height={200} />}
      </div>
    </div>
  );
}

export default App;

//depricated

import React from 'react';
import { useSelector } from 'react-redux';
import Pre from './Pre';
import Post from './Post';

export default function Survey() {
  const { userInfo } = useSelector((state) => state.user);
  
  return (
    <>
      {userInfo.subscribed === "none" ? (
        <div>
          <Pre />
        </div>
      ) : (
        <div>
          <Post />
        </div> 
      )}
    </> 
  );
}

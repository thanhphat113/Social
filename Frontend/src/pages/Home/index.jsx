import React from 'react'
import PostCard from '../../components/Home/PostCard/PostCard.jsx'
import PostList from '../../components/Home/PostList/'
import LeftBar from '../../components/Home/LeftBar/LeftBar.jsx'  
import RightBar from '../../components/Home/RightBar/RightBar.jsx'  
import PostInput from '../../components/Home/PostInput/PostInput.jsx';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.leftBar}>
          <LeftBar />
        </div>
        <div className={styles.mainBar}>
          <PostInput />
          <PostList />
        </div>
        <div className={styles.rightBar}>
          <RightBar />
        </div>
      </div>
    </>
  )
}



import React from 'react'
import User from './User'
import image from '../utils/image.png'


const About = () => {
  return (
    <div className='flex'>
      
      <img className='h-[100rem] w-[30rem] object-cover object-left' src='https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=320x320&vertical=center 320w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=400x400&vertical=center 400w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=640x640&vertical=center 640w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=752x752&vertical=center 752w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=1024x1024&vertical=center 1024w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=1200x1200&vertical=center 1200w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=1504x1504&vertical=center 1504w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=2048x2048&vertical=center 2048w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=317x317&vertical=center 317w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=634x634&vertical=center 634w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=80x80&vertical=center 80w, https://cdn.dribbble.com/userupload/13786271/file/original-6c77a796a9cada5429c2d30cdea65290.png?resize=160x160&vertical=center 160w' alt="" />
      
      {/* <p>This is the about page.</p> */}
      <User/>
    </div>
  )
}

export default About

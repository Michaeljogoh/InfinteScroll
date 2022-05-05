 import React, { useEffect, useState, useRef  } from 'react';
 import '../App.css'
import david from '../image/david.jpg'
import faith from '../image/faith.jpg'
import aaron from '../image/aaron.jpg'
import james from '../image/james.jpg'
import version from '../image/version.jpg'
import olivia from '../image/olivia.jpg'





 
const InfiniteScroll = () => {
    const [postList, setPostList] = useState({list: [
        
            {image:david, text: "1 : David"} , 
            {image:faith ,text: "2 : Faith"}, 
            {image:aaron ,text: "3 : Aaron"}, 
            {image:james, text: "4 : James"}, 
            {image:version, text:"5 : Version"}, 
            {image:olivia, text:'6 : Olivia '}
    
 ]}); 
    // tracking on which page we currently are
    const [page, setPage] = useState(1);
    // add loader refrence 
    const loader = useRef(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
        // initialize IntersectionObserver
        // and attaching to Load More div
         const observer = new IntersectionObserver(handleObserver, options);
         if (loader.current) {
            observer.observe(loader.current)
         }

    }, []);


    useEffect(() => {
        // here we simulate adding new posts to List
        const newList = postList.list.concat([
            {image:david, text: "1 : David"} , 
            {image:faith ,text: " 2 : Faith"}, 
            {image:aaron ,text: " 3 : Aaron"}, 
            {image:james, text: " 4 : James"}, 
            {image: version, text:" 5 : Version"}, 
            {image: olivia, text:'6 : Olivia '}
           
        ]);
        setPostList({
            list: newList
        })
    }, [page])

    // here we handle what happens when user scrolls to Load More div
   // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
    }


    return (
        <div className="container">
              <div className='header'>
                InfiniteScroll
            </div>
           

        <div className="post-list">

     {
                postList.list.map((post, index) => {
                return (<div key={index} className="post">
                    <img src={post.image} />
                <div className='header'>
                {post.text}
            </div>
              
                    
                    </div>
            )
            })
 }

   
            <div className="loading" ref={loader}>
                    <h2>Load More</h2>
           </div>
        </div>
    </div>)
}

export default InfiniteScroll;

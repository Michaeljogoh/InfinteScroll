 import React, { useEffect, useState, useRef  } from 'react';
 import '../App.css'
import Hello from '../image/hello.jpg'
import bring from '../image/bring.jpg'
import fence from '../image/fence.jpg'
import enlight from '../image/enlight.jpg'
import eco from '../image/eco.jpg'
import home from '../image/home.jpg'





 
const InfiniteScroll = () => {
    const [postList, setPostList] = useState({list: [Hello , bring , fence, enlight, eco, home]}); 
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
        const newList = postList.list.concat([Hello, bring, fence, enlight, eco, home]);
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

        <div className="post-list">

     {
                postList.list.map((post, index) => {
                return (<div key={index} className="post">
                    <img src={post} />
                <h2>{post}</h2>
              
                    
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

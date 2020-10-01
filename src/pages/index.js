import React, { useState } from "react"
import Layout from "../components/Layout"
import Fuse from 'fuse.js'
import db from "../db.json"


export default function Home() {



    const fuseCate = new Fuse(db.category);
    const fusePost = new Fuse(db.posts);

    const [category,setCategory]= useState(fuseCate._docs.map(cate =>cate))
    const [posts,setPosts]= useState(fusePost._docs.map(post =>post))


    const onHandleAddCate=(cate)=>{
        fuseCate.add(cate);
        const data = fuseCate._docs.map(cate=>cate)
        setCategory(data)

    }
    const onHandleRemovePost=(id)=>{
      const data = posts.filter(post => post.id !==id)
      setPosts(data)
   
    }
    const onHandleDeleteCate=(id)=>{
      const data= category.filter(cate =>cate.id!==id);
      const newPost = posts.filter(post =>post.cateId!==id)
      setPosts(newPost)
      setCategory(data)
    }

  return <div>
      <Layout category={category} posts={posts} onRemovePost={onHandleRemovePost} onRemoveCate={onHandleDeleteCate} onAddCate={onHandleAddCate} />
  </div>
}

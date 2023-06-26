const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');
const cloudinaryUploadImg = require('../utils/cloudinary')
const fs = require('fs')

const createBlog = asyncHandler(async(req,res)=>{
    try{
        const newBlog = await Blog.create(req.body);
        res.json(newBlog)
    }catch(err){
        throw new Error(err);
    }
})

const updateBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try{
        const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{
            new: true,
        });
        res.json(updateBlog)
    }catch(err){
        throw new Error(err);
    }
})

const getBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try{
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: {numViews: 1},
            },
            {
                new: true
            }
        )
        res.json(getBlog)
    }catch(err){
        throw new Error(err);
    }
})

const getAllBlog = asyncHandler(async(req,res)=>{
    try{
        const getBlogs = await Blog.find();
        res.json(getBlogs)
    }catch(err){
        throw new Error(err)
    }
})

const deleteBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try{
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog)
    }catch(err){
        throw new Error(err);
    }
})

const likeTheBlog = asyncHandler(async(req,res)=>{
    const { blogId } = req.body
    console.log(blogId,req.body)
    validateMongoDbId(blogId)
    // find the blod which you want to be liked
    const blog = await Blog.findById(blogId)
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find the user if he disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(((userId) => userId?.toString() === loginUserId?.toString()))

    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {dislikes: loginUserId},
            isDisliked: false
        },{
            new: true
        })
        res.json(blog)
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {likes: loginUserId},
            isLiked: false
        },{
            new: true
        })
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push: {likes: loginUserId},
            isLiked: true
        },{
            new: true
        })
        res.json(blog)
    }
})

const dislikeTheBlog = asyncHandler(async(req,res)=>{
    const { blogId } = req.body
    console.log(blogId,req.body)
    validateMongoDbId(blogId)
    // find the blod which you want to be liked
    const blog = await Blog.findById(blogId)
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find the user if he disliked the blog
    const alreadyliked = blog?.likes?.find(((userId) => userId?.toString() === loginUserId?.toString()))

    if(alreadyliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {likes: loginUserId},
            isLiked: false
        },{
            new: true
        })
        res.json(blog)
    }
    if(isDisLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {dislikes: loginUserId},
            isDisliked: false
        },{
            new: true
        })
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push: {dislikes: loginUserId},
            isDisliked: true
        },{
            new: true
        })
        res.json(blog)
    }
})

const uploadImages = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try{
        const uploader = (path)=> cloudinaryUploadImg(path,'images')
        const urls = [];
        const files = req.files
        for(const file of files){
            const {path} = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path)
        }
        const findBlog = await Blog.findByIdAndUpdate(
            id,
            {
                images: urls.map((file)=>{
                        return file
                    }),
            },
            {
                new: true
            }
        )
        res.json(findBlog)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = {createBlog,updateBlog,getBlog,getAllBlog,deleteBlog,likeTheBlog,dislikeTheBlog , uploadImages}
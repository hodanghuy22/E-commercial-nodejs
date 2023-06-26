const Category = require('../models/blogCateModel')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createCategory = asyncHandler(async(req,res)=>{
    try{
        const newCategory = await Category.create(req.body)
        res.json(newCategory);
    }catch(err){
        throw new Error(err)
    }
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const updateCategory = await Category.findByIdAndUpdate(id,req.body,{
            new:true,
        })
        res.json(updateCategory);
    }catch(err){
        throw new Error(err)
    }
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const deleteCategory = await Category.findByIdAndDelete(id,req.body,{
            new:true,
        })
        res.json(deleteCategory);
    }catch(err){
        throw new Error(err)
    }
})

const getCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const getCategory = await Category.findById(id);
        res.json(getCategory)
    }catch(err){
        throw new Error(err)
    }
})

const getAllCategory = asyncHandler(async(req,res)=>{
    try{
        const getallCategory = await Category.find();
        res.json(getallCategory)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory }
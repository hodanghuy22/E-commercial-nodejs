const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createBrand = asyncHandler(async(req,res)=>{
    try{
        const newBrand = await Brand.create(req.body)
        res.json(newBrand);
    }catch(err){
        throw new Error(err)
    }
})

const updateBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const updateBrand = await Brand.findByIdAndUpdate(id,req.body,{
            new:true,
        })
        res.json(updateBrand);
    }catch(err){
        throw new Error(err)
    }
})

const deleteBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const deleteBrand = await Brand.findByIdAndDelete(id,req.body,{
            new:true,
        })
        res.json(deleteBrand);
    }catch(err){
        throw new Error(err)
    }
})

const getBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const getBrand = await Brand.findById(id);
        res.json(getBrand)
    }catch(err){
        throw new Error(err)
    }
})

const getAllBrand = asyncHandler(async(req,res)=>{
    try{
        const getallBrand = await Brand.find();
        res.json(getallBrand)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand }
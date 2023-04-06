const express=require('express')
const {randomBytes}=require('crypto')
const bodyParser= require('body-parser')
const cors=require('cors')

const app=express()
app.use(bodyParser.json())
app.use(cors())

const commentsById={}

app.get('/posts/:id/comments',(req,res,next)=>{
    res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments',(req,res,next)=>{
    const postId=req.params.id
    console.log(postId);
    const id=randomBytes(4).toString('hex')
    const {content} = req.body
    const comments=commentsById[postId] || []
    

    comments.push({
        id,
        content
    })//identified by the post id and has an id for the individual comment as well.
    
    console.log(commentsById);

    commentsById[postId]=comments

    res.status(201).send(commentsById[postId])//send the comments of this post
})

app.listen(4001,()=>{
    console.log('listening  on 4001');
})
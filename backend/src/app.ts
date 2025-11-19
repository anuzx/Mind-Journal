import express from "express"
const app = express()




//routes
import signupRouter from "./routes/signup.routes.js"
app.use("/api/v1/singup", signupRouter)


app.use("/api/v1/signin")
app.use("/api/v1/content")
app.post("/api/v1/brain/share", authUser (req, res) => {
    const {share} = req.body
})


app.get("/api/v1/content", (req, res) => {
    
})


app.delete("/api/v1/content", (req, res) => { });

app.get("/api/v1/brain/:sharelink", (req, res) => {
    
})




export { app };
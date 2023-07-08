const express = require('express')
const exphbs = require('express-handlebars')
const accounts = require('./accounts')
const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine' , 'hbs')
//設定body-parser
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
  res.redirect('login')
})
app.get('/login',(req,res)=>{
  res.render('login')
})

app.post('/login',(req,res)=>{
  const account = req.body
  const users = accounts.users

  //確認帳號，若找不到帳號則直接回傳錯誤訊息
  const user =  users.find(user => user.email === account.email)
  if(!user){
    return res.send('無此Email !')
  }
  
  //若找到帳號則確認密碼，若密碼正確則登入，錯誤則回傳錯誤訊息
  if( user.password === account.password ){
    return res.send(`Welcome back ${user.firstName} `)
  }else{
    return res.send('密碼錯誤 !!!!')
  }
})




app.listen(3000,()=>{
  console.log('http://localhost:3000')
})
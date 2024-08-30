const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer  = require('multer')
require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system.js")

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");


database.connect();

const app = express()
const port = process.env.PORT;

// Ghi đè method 
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// cấu hình pug
app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

// Flash
app.use(cookieParser('asdfghjklzxcvbnm'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash



// App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`))

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// SPA & MPA -------------------------------------------------
// ● Multiple Page Application là gì?
// ● MPA là khi người dùng truy cập các trang con trên web, thì server sẽ xử lý và trả về toàn bộ trang
// web và web đó sẽ được load lại mới hoàn toàn.
// ● Ví dụ: shopee.vn, tiki.vn, sendo.vn,...

// ● Single Page Application là gì?
// ● SPA là khi người dùng truy cập các trang con trên web, website sẽ chỉ load lại những phần giao
// diện thay đổi, những giao diện không thay đổi sẽ không bị load lại.
// ● Ví dụ: youtube.com, facebook.com, gmail.com,...






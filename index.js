const express = require('express');
require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system.js")

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");


database.connect();

const app = express()
const port = process.env.PORT;

// cấu hình pug
app.set("views", "./views")
app.set("view engine", "pug")

// App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"))

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






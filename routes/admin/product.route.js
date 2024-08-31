const express = require("express");
const multer = require('multer');
// const storangeMulter = require("../../helpers/storangeMulter.js");
// const upload = multer({ storage: storangeMulter() });

const upload = multer();


const route = express.Router()

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changeStatus); // : dùng để truyền data động
route.patch("/change-multi", controller.changeMulti); // : dùng để truyền data động
route.delete("/delete/:id", controller.deleteItem); // : dùng để truyền data động
route.get("/create", controller.create);
route.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost, // middleware: là trung gian check xem request có thỏa mãn ko thì mới được chạy tiếp
    controller.createPost
);

route.get("/edit/:id", controller.edit); // :id dùng để truyền data động
route.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost, // middleware: là trung gian check xem request có thỏa mãn ko thì mới được chạy tiếp
    controller.editPatch
);
route.get("/detail/:id", controller.detail); // :id dùng để truyền data động


module.exports = route;



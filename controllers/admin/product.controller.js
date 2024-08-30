const Product = require("../../model/product.model");
const systemConfig = require("../../config/system.js")
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination.js")

// [GET] /admin/dashboard
module.exports.index = async (req, res) => {

    // filter
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status
    }

    // search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regrex) {
        find.title = objectSearch.regrex;
    }
    //End search

    // pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4
    },
        req.query,
        countProducts
    )
    // End pagination
    const products = await Product.find(find)
        .sort({position: "desc"})
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Product list page",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status })
    req.flash("success", "Update status successfully!");
    res.redirect("back"); // redirect ve trang trc do
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", `Update status successfully ${ids.length} items!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", `Update status successfully ${ids.length} items!`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deleteAt: new Date()
            });
            req.flash("success", `Delete successfully ${ids.length} items!`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position)
                await Product.updateOne({ _id: id }, { position: position }) 
                req.flash("success", `Change position successfully ${ids.length} items!`);

            }
            break;
        default:
            break;
    }

    res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({ _id: id }, {
        deleted: true,
        deleteAt: new Date()
    });
    req.flash("success", `Delete successfully!`);
    res.redirect("back"); // redirect ve trang trc do
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/products/create.pug", {
        pageTitle: "Create product page"
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products/`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find);

        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Edit page",
            product: product
        });
    } catch (error) {
        req.flash("error", `Item doeas not exist !`);
        res.redirect(`${systemConfig.prefixAdmin}/products/`);
    }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({_id: id}, req.body)
        req.flash("success", `Update successfully !`);
        
    } catch (error) {
        req.flash("error", `Update fail !`);
        
    }
    res.redirect("back"); 
}

module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find);
        
        res.render("admin/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", `Item doeas not exist !`);
        res.redirect(`${systemConfig.prefixAdmin}/products/`);
    }
}
const Product = require("../../model/product.model")

// [GET] /admin/dashboard
module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active",
            status: "active",
            class: ""
        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""
        }
    ];
    
    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    let find = {
        deleted: false
    };
    if(req.query.status) { // check url co active k
        find.status = req.query.status
    };

    const products = await Product.find(find)
    
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Product list page",
        products: products,
        filterStatus: filterStatus
    })
}
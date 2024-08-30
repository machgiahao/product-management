const Product = require("../../model/product.model")

// [GET] /product
module.exports.index = async (req, res) => {

    const products = await Product.find({
        status: "active",
        deleted: "false"
    }).sort({position: "desc"});

    const newProducts = products.map(item => {
        item.priceNew = ((item.price*(100-item.discountPercentage))/100).toFixed(0);
        return item;
    })

    console.log(newProducts);
    res.render("client/pages/products/index.pug", {
        pageTitle: "Product page",
        products: newProducts
    })
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {

    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
    
        const product = await Product.findOne(find);
        
        res.render("client/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", `Item doeas not exist !`);
        res.redirect(`/products/`);
    }

}
module.exports = (query) => {
    let objectSearch = {
        keyword: "",
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword; 
        // const regrex = /keyword/i;  // i: ignore case
        const regrex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regrex = regrex;
    }
    return objectSearch;
}
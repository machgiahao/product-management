
// Button status
const buttonStatus = document.querySelectorAll("[button-status]") // Cac thuoc tinh tu dinh nghia nen su dung dau []
if(buttonStatus.length > 0 ) {
    let url = new URL(window.location.href); // chua ham de xu li url 

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status) {
                url.searchParams.set("status", status)  //cap nhat param status
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href; // chuyen huong sang trang khac
        })
    })
}


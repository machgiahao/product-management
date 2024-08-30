
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
//End Button status

// Form search
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;

        if(keyword) {
            url.searchParams.set("keyword", keyword)  //cap nhat param status
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}
//End Form search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]")
if(buttonStatus) {
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            
            window.location.href = url.href;
        })
    })   
}

// End Pagination

// Check box
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if(checkBoxMulti) {
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']")
    const inputsId = checkBoxMulti.querySelectorAll("input[name='id']")
    
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length; // find number of button are checked
            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });
}
// End check box

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault(); // submit will reload page so we need to use preventDefault() to prevent this event
        const checkBoxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked"); 
        
        const typeChange = e.target.elements.type.value;
        if(typeChange == "delete-all"){
            const isConfirm = confirm("Are you sure to delete items ?");

            if(!isConfirm) {
                return; // when user click cancel, use return to stop working the codes below
            }
        }

        if(inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;
                if(typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name=position]").value;
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }

            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Please choose at least 1 record !");
        }

    })

}
// End form change multi

// Show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    });
}
// End Show alert

// Preview before upload
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const closeBtn = document.querySelector("[closeBtn]")

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        console.log(file)
        if(file) {
            closeBtn.classList.remove("d-none")
            uploadImagePreview.src = URL.createObjectURL(file);
            closeBtn.addEventListener("click", () => {
                uploadImageInput.value = "";
                uploadImagePreview.src = "";
                closeBtn.classList.add("d-none")

            })
        }
    });
}





// End Preview before upload


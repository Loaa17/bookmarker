var bookNameInput = document.getElementById("bookName");

var bookUrlInput = document.getElementById("bookUrl");

var submitBtn = document.getElementById("submitBtn");

var updateBtn = document.getElementById("updateBtn");

var booksContainer =[];


// check items in local storage
if(localStorage.getItem("books") == null){
    booksContainer = []; 
}
else{
    booksContainer = JSON.parse(localStorage.getItem("books"));
    display();
}

// add
function addBook(){

 if(
    bookNameInput.classList.contains('is-valid')&&
    bookUrlInput.classList.contains('is-valid')
  )
{
    var book = {
        name: bookNameInput.value,
        link: bookUrlInput.value,
    }
    
    booksContainer.push(book);

    localStorage.setItem("books" , JSON.stringify(booksContainer));
    console.log(booksContainer);
    
    clearForm();
    display();


 }
    else{
        alert("Please fill the form correctly");
    }

};

// clear
function clearForm(){
    bookNameInput.value = null;
    bookUrlInput.value = null;
};

// display
function display(){
    var bookList = '';


    for(var i = 0 ; i < booksContainer.length ; i++){
        bookList += `<tr>
        <td>${booksContainer[i].name}</td>
        <td>${booksContainer[i].link}</td>
        <td><button onclick="visitUrl(${i});" class="btn btn-primary visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="update(${i});" class="btn btn-warning update"><i class="fa-solid fa-pen-to-square pe-2"></i>Update</button></td>
        <td><button onclick="deleteBook(${i});" class="btn btn-danger delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`
    }

    document.getElementById("data").innerHTML = bookList;
}

// delete
function deleteBook(deletedItem){

// sweet alert
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2",
          cancelButton: "btn btn-danger mx-2"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            booksContainer.splice(deletedItem , 1);
            console.log(booksContainer);
            display();
            localStorage.setItem("books" , JSON.stringify(booksContainer));

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

// sweet alert









   
}

// update
var updatedIndex ;

function update(updated){
    updatedIndex = updated 
bookNameInput.value = booksContainer[updated].name;
bookUrlInput.value = booksContainer[updated].link;

updateBtn.classList.remove('d-none');

submitBtn.classList.add('d-none');

bookNameInput.classList.add('is-valid');
bookUrlInput.classList.add('is-valid');
}

function updateBook(){

    if(
        bookNameInput.classList.contains('is-valid')&&
        bookUrlInput.classList.contains('is-valid')
      ){
        booksContainer[updatedIndex].name = bookNameInput.value;
        booksContainer[updatedIndex].link = bookUrlInput.value;
        
    
        display();
        localStorage.setItem("books" , JSON.stringify(booksContainer));
        clearForm();
        updateBtn.classList.add('d-none');
        submitBtn.classList.remove('d-none');
    }
    else{
        alert("Please fill the form correctly");
    }
      }

   
// validation
function validationForm(item){



    var regex = {
        bookName : /^[a-z]{3,9}$/,
        bookUrl : /^http:\/[a-z]{3,7}[1-9]{0,3}\.com$/,   
    }
   
    


    if (regex[item.id].test(item.value)) {

        item.classList.add('is-valid');

        item.classList.remove('is-invalid');

        item.nextElementSibling.classList.add('d-none');

    } else {

        item.classList.add('is-invalid');

        item.classList.remove('is-valid');

        item.nextElementSibling.classList.remove('d-none');

    }

}


function visitUrl(indexUrl){

window.open(booksContainer[indexUrl].link , "_blank");
}




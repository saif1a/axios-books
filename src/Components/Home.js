import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import Books from "./Books";
import ModalView from "./ModalView";
 
function Home() {
 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [books, setBooks] = useState([]);



    useEffect((books) => {
        axios.get("http://acelens.me:8888/api/books", {
            headers: { Authorization: "Bearer BOOKS_API_TOKEN_KEY" },
          })
          .then(function (response) {
            setBooks(response.data.data);
          });

      }, [books.length]);





  return (
 
       <div className="container ">
          <div className="row ">
           
           
              <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"brown"}}><h2><b>Books Details</b></h2></div>
              <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="outline-primary" onClick={handleShow}>
                Add New Book
              </Button>
             </div>
           </div>  
            <div className="row">
            <div className="table-responsive " >
                <Books key={books.id} data={{ books: books , setBooks : setBooks}}/>
            </div>   
         </div>  
         <ModalView data={{ handleClose: handleClose , show :show }} />

          
      </div>  
  );
}
 
export default Home;
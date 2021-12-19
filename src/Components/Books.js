import React,{useState} from 'react';
import axios from "axios";
import ModalViewUpdate from './ModalViewUpdate';



export default function Books(props) {
    const { books , setBooks  } = props.data;
    const [book, setBook] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteBook = (id) => {
        axios
          .delete(`http://acelens.me:8888/api/books/${id}`, {
            headers: { Authorization: "Bearer BOOKS_API_TOKEN_KEY" },
          })
          .then(function (response) {
            setBooks([]);
          });
      };
      const GetBookByID = (id) => {
        axios
          .get(`http://acelens.me:8888/api/books/${id}`, {
            headers: { Authorization: "Bearer BOOKS_API_TOKEN_KEY" },
          })
          .then(function (response) {
            setBook(response.data);
            handleShow();
          });
      };
    


    return (
        <>
        <ModalViewUpdate  data={{ book:book,handleClose: handleClose , show :show }} />
        <table className="table table-striped table-hover ">
        <thead>
                <tr>
                    <th>ID</th>
                    <th>Name </th>
                    <th>Author</th>
                    <th>Quantity </th>
                    <th>Price </th>
                    <th>Release Date </th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                </tr>
        </thead>
        <tbody>
        {books.map((book) =>( 
            <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.quantity}</td>
            <td>{book.price}</td>
            <td>{book.release_date}</td>
            <td>{book.created_at}</td>
            <td>{book.updated_at}</td>
    
            <td>
              <div className="d-inline-flex m-0">
              <button
                onClick={() => GetBookByID(book.id)}
                className="btn  edit m-1"
                title="Edit"
                data-toggle="tooltip"
                style={{ color: "green" }}

              >
                <i className="material-icons">&#xE254;</i>
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="btn delete m-1"
                title="Delete"
                data-toggle="tooltip"
                style={{ color: "red" }}
              >
                <i className="material-icons">&#xE872;</i>
              </button>
              </div>
            </td>
          </tr>

        ))}
        </tbody>
    </table>
    </>
    )
}

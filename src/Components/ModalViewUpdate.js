import React, { useState } from 'react'
import { Button,Modal } from 'react-bootstrap';
import axios from "axios";


export default function ModalViewUpdate(props) {
    const { book,handleClose,show } = props.data;
   
    const [formData, setFormData] = useState({
      name: "",
      Author: "",
      Quantity: "",
      Price: "",
      date: "",
      });
      const [alert, setAlert] = useState(true);
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      
     

      const handelClick = (e,id) => {
        e.preventDefault();
        
        if (formData.name==="" || formData.Author===""|| formData.Quantity===""|| formData.Price===""|| formData.date==="") {
            setAlert(false);
            return null;
        }
        
        axios.put(
            `http://acelens.me:8888/api/books/`+id+`?name=${formData.name}&author=${formData.Author}&quantity=${formData.Quantity}&price=${formData.Price}&release_date=${formData.date}`,
            {},
            {
              headers: { Authorization: "Bearer BOOKS_API_TOKEN_KEY" },
            }
          )
          .then(function (response) {
            setAlert(true);
            setFormData({
                name: "",
                Author: "",
                Quantity: "",
                Price: "",
                date: "",
              })
            console.log(response);
            handleClose();
          });
      };
     


    return (
        <div className="model_box">
        <Modal
          show={show}
          onHide={(e)=>{handleClose(e);setAlert(true);setFormData({name: "",Author: "",Quantity: "",Price: "",date: ""});}}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
              <Modal.Body>
              { alert===false &&
                  <div className="alert alert-danger" role="alert">
                  You Must Fill All Text Fields.
                </div>
              }
              <form >
          <div className="form-group">
              
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              id="Author"
              name="Author"
              value={formData.Author}
              onChange={handleChange}
              aria-describedby="Author"
              placeholder="Enter Author"
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="number"
              className="form-control"
              id="Quantity"
              name="Quantity"
              aria-describedby="Quantity"
              placeholder="Enter Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="number"
              className="form-control"
              id="Price"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              placeholder="Enter Price"
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
              required
            />
          </div>

          <Button
            type="submit"
            className="btn btn-success mt-4"
            onClick={(e) =>{ 
                handelClick(e,book.id)
            }}
          >
            Update Book
          </Button>
        </form>
              </Modal.Body>
   
          <Modal.Footer>
            <Button variant="secondary"  onClick={(e)=>{handleClose(e);setAlert(true);setFormData({name: "",Author: "",Quantity: "",Price: "",date: ""});}}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
          </div>  
    )
}


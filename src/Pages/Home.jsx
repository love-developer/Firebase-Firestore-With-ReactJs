import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { db } from "../Firebase/Index";
import {
  deleteDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function Home() {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // Handle Modal Visibility
  const handleModalShow = () => setShow(true);
  const handleModalClose = () => {
    setShow(false);
    clearForm();
  };

  // Clear Form Fields
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  // Save or Update Data
  const handleSaveChanges = async () => {
    if (!title || !description) {
      setShowAlert(true);
      return;
    }

    try {
      if (editId) {
        // Update existing document
        await updateDoc(doc(db, "users", editId), { title, description });
        console.log("Document updated successfully");
      } else {
        // Add new document
        const docRef = await addDoc(collection(db, "users"), {
          title,
          description,
        });
        console.log("Document added with ID:", docRef.id);
      }
      handleModalClose();
      fetchAllData(); // Refresh data
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Fetch All Data
  const fetchAllData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete Item
  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      console.log("Item deleted successfully");
      fetchAllData(); // Refresh data
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Edit Item
  const handleEditItem = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item.id);
    setShow(true);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (showAlert) {
    return (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Oh No! You got an error!</Alert.Heading>
        <p className="text-black"> Please enter a title and description Both</p>
      </Alert>
    );
  }
  return (
    <>
      <Button variant="primary" onClick={handleModalShow} className="m-3">
        Add Item
      </Button>

      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            {editId ? "Edit Data" : "Add Data"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            {editId ? "Update Item" : "Add Item"}
          </Button>
        </Modal.Footer>
      </Modal>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            margin: "10px",
            backgroundColor: "#343a40",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>
            Delete
          </Button>
          <Button variant="warning" onClick={() => handleEditItem(item)}>
            Edit
          </Button>
        </div>
      ))}
    </>
  );
}

export default Home;

// my written code =============>
// my written code =============>
// my written code =============>
// my written code =============>
// my written code =============>
// my written code =============>
// my written code =============>

// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { db } from "../Firebase/Index";
// import {
//   deleteDoc,
//   doc,
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";

// function Home() {
//   const [show, setShow] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [items, setItems] = useState([]);

//   //   add data to firestore
//   const saveChanges = async (title, description) => {
//     setShow(false);
//     console.log("save changes");
//     if (title && description) {
//       try {
//         const docRef = await addDoc(collection(db, "users"), {
//           title,
//           description,
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     } else {
//       alert("Please enter a title and description");
//     }
//   };

//   //   get data from firestore and use it when dom is loaded using useEffect
//   const getAllData = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     setItems([]);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       setItems((prevItems) => [...prevItems, { id: doc.id, ...doc.data() }]);
//     });
//   };
//   useEffect(() => {
//     getAllData();
//   }, []);

//   // popup disapear when cancel button is clicked
//   const cancelChanges = () => {
//     setShow(false);
//   };

//   // popup appear when add button is clicked
//   const showModal = () => {
//     setShow(true);
//   };

//   //   delete data from firestore
//   const deleteItem = async (id) => {
//     await deleteDoc(doc(db, "users", id))
//       .then(() => {
//         console.log("deleted successfully");
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });
//   };

//   //   eddit data from firestore
//   const updateItem = async (id) => {
//     const cityRef = doc(db, "users", id);
//     await updateDoc(cityRef, {
//       title,
//       description,
//     });
//     setShow(true);
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={showModal} className="m-3">
//         Add Item
//       </Button>

//       <Modal show={show}>
//         <Modal.Header closeButton>
//           <Modal.Title className="text-primary">Add Data</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Title"
//                 autoFocus
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Example textarea</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => cancelChanges()}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => saveChanges(title, description)}
//           >
//             {updateItem ? "Update Item" : "Add Item"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {items.map((item, index) => {
//         return (
//           <div
//             key={index}
//             style={{
//               margin: "10px",
//               backgroundColor: "#343a40",
//               padding: "10px",
//               borderRadius: "5px",
//             }}
//           >
//             <h1>{item.title}</h1>
//             <p>{item.description}</p>
//             <Button variant="danger" onClick={() => deleteItem(item.id)}>
//               Delete
//             </Button>
//             <Button variant="warning" onClick={() => updateItem(item.id)}>
//               Edit
//             </Button>
//           </div>
//         );
//       })}
//     </>
//   );
// }

// export default Home;

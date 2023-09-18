// importing the useNavigate hook
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Show(props) {
  // set up nav function with the useNavigate hook
  const navigate = useNavigate();
  const { id } = useParams();
  const people = props.people;
  const person = people ? people.find((p) => p._id === id) : null;

  const [editForm, setEditForm] = useState({
    name: "",
    title: "",
    image: ""
  });

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    })
  )};

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm);
  };

  const handleDelete = () => {
    props.deletePeople(person._id);
    navigate('/');
  };

  const loaded = () => {
    return (
      <>
        <h1>{person.name}</h1>
        <h2>{person.title}</h2>
        <img 
          className="avatar-image" 
          src={person.image} 
          alt={person.name} 
        />
        <button id="delete" onClick={handleDelete}>
          DELETE
        </button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  useEffect(() => {
    if(person) { 
      setEditForm(person);
    }
  }, [person]);

  return (
    <div className="person">
      { person ? loaded() : loading() }
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}

export default Show;
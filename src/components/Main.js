
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = 'https://express-react-backend-people-284e0d8d72d8.herokuapp.com/people';

  const getPeople = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      // TODO: Add a task we'd like to perform in the event of an error
    }
  };

  const createPeople = async (person) => {
    try {
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(person),
      });
      getPeople();
    } catch (error) {
      // TODO: Add a task we'd like to perform in the event of an error
    }
  };

  const updatePeople = async (person, id) => {
    await fetch(URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };


  const deletePeople = async (id) => {
    await fetch(URL + id, {
      method: 'DELETE',
    });
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <main>
      <Routes>
        <Route 
          path="/" 
          element={
            <Index 
              people={people} 
              createPeople={createPeople} 
            />
          }
        />
        <Route
          path="/people/:id"
          element={
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
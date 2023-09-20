
import axios from 'axios';
import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(9);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexofFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexofFirstCard, indexOfLastCard);
  const totalPage = Math.ceil(data.length / cardsPerPage);

  const handlePre = () => {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
  }

  const handleNext = () => {
      if (currentPage !== totalPage) {
        setCurrentPage(currentPage + 1);
      }
  }

   const getData = async () => {
    try {
      await axios.get("https://rickandmortyapi.com/api/character")
      .then(res => {
        setData(res.data.results);
        console.log(res.data)
      })
    } catch (err) {
      console.log(err)
    }
    
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div style={{display: 'flex', justifyContent: "center"}}>
      <div className="container">
        <div>
          Rick And Morty Characters
        </div>

        <div className='card-list'>
          {currentCards.map((item, idx) => (
            <Card
              key={idx} 
              image={item.image}
              name={item.name}
            />
          ))}
        </div>

        <div className='pagination'>
          <div className={currentPage === 1 ?'nav-btn disabled' : 'nav-btn'}
              onClick={handlePre}
          >
            prev
            </div>

          {[...Array(totalPage)].map((pageNo, idx) => (
            <div
              key={idx}
              className='page-btn'
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </div>
          ))}

          <div className={currentPage === totalPage ?'nav-btn disabled' : 'nav-btn'}
            onClick={handleNext}
          >
            next
            </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;

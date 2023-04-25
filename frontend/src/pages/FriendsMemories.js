import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GridLayout, Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import "../styles/FriendsMemories.css";

//Modal.setAppElement('#FriendsMemories');

function FriendsMemories() {
  const {ID} = useParams();
  //const post = drawings[ID] 
  //These are how I carried the user selected between pages in comments 
  //I left them for reference if you wish to do them similarly

  //Leaving this here as an example, working, POST request!
  /*const [prompt, setPrompt] = useState({
    id: 0,
    prompt: "",
    promptGenre: "",
    alreadyUsed: false,
    previousWinner: "",
  });

  const handleChange1 = (e) => {
    e.preventDefault();

    setPrompt({
      id: parseInt(e.target.value),
      prompt: prompt.prompt,
      promptGenre: prompt.promptGenre,
      alreadyUsed: false,
      previousWinner: "",
    });
  };

  const handleChange2 = (e) => {
    e.preventDefault();

    setPrompt({
      id: prompt.id,
      prompt: e.target.value,
      promptGenre: prompt.promptGenre,
      alreadyUsed: false,
      previousWinner: "",
    });
  };

  const handleChange3 = (e) => {
    e.preventDefault();

    setPrompt({
      id: prompt.id,
      prompt: prompt.prompt,
      promptGenre: e.target.value,
      alreadyUsed: false,
      previousWinner: "",
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    //axios
      //.post(`/api/prompts/`, { prompt })
      axios({
        method: 'post',
        url: '/api/prompts/',
        data: {
          id: prompt.id,
          prompt: prompt.prompt,
          promptGenre: prompt.promptGenre,
          alreadyUsed: prompt.alreadyUsed,
          previousWinner: "N/A",
        },
        headers: {
          "content-type": "application/json",
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch ((error) => {
        if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        }
    });
  }; */

  const [userData, setUserData] = useState([]);

  axios({
    method: 'get',
    url: '/api/user_memories/'
  })
  .then((res) => {
    console.log("Data is = " + res)
  })

  const [value, setValue] = useState('date');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [reason, setReason] = useState('default');

  const handleReportChange = (e) => {
    setReason(e.target.value);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function submitReport() {
    setIsOpen(false);
  }

  //Will be really easy to just load every image (with information) into the array
  const layout = [
    { i: "blue-eyes-dragon", x: 0, y: 0, w: 1, h: 1 },
    { i: "dark-magician", x: 1, y: 0, w: 1, h: 1 },
    { i: "kuriboh", x: 2, y: 0, w: 1, h: 1 },
    { i: "spell-caster", x: 3, y: 0, w: 1, h: 1 },
    { i: "summoned-skull", x: 0, y: 1, w: 1, h: 1 }
  ];

  const ResponsiveGridLayout = WidthProvider(Responsive);
  
  const GridItemWrapper = styled.div`
    background: white;
    border: 10px;
    border-color: white;
    text-align: center;
  `;
  
  const GridItemContent = styled.div`
    padding: 8px;
    color: black;
    font-size: 25px;
  `;
  
  const Root = styled.div`
    padding: 16px;
    margin-top: 20px
  `;

  return (
    <div className="FriendsMemoriesDiv">
      <div className="Title">
        User {ID}'s Drawings
      </div>

      <div className="DropdownDiv">
        <label>
          Order By:
          <select value={value} onChange={handleChange}>
            <option value="date">Date Drawn</option>
            <option value="highRate">Highest Rated</option>
            <option value="lowRate">Lowest Rated</option>
          </select>
        </label>
      </div>

      <Root>
        <ResponsiveGridLayout
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }}
          rowHeight={300}
          width={1000}
          isDraggable={false}
        >
          <GridItemWrapper key="blue-eyes-dragon">
            <GridItemContent>
              <img src="PLACEHOLDER" alt={"Missing image"}/> <br></br>
              Drawn on: DD/MM/YYYY <br></br>
              <Button onClick={openModal}>
                Report Inappropriate Drawing
              </Button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Report Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Report</h2>
                <button onClick={closeModal} className="closeButton">X</button>
                <div className="ReportHeader">
                  <h1><u>Report {ID}'s Drawing</u></h1>
                  <p>You are reporting {ID}'s drawing</p>
                </div>
                <form className="ReportForm">
                  <label>
                    Please pick an option that best describes the drawing: <br></br>
                    <select value={reason} onChange={handleReportChange}>
                      <option value="default">Please select</option>
                      <option value="offensive">The drawing is offensive</option>
                      <option value="inappropriate">The drawing is inappropriate</option>
                      <option value="unrelated">The drawing is unrelated to the prompt</option>
                    </select>
                  </label> <br></br><br></br>
                  Any other comments? <br></br>
                  <input></input> <br></br><br></br>
                  <button onClick={submitReport}>Submit Report</button>
                  <button onClick={closeModal}>Cancel Report</button>
                </form>
              </Modal>
            </GridItemContent>
          </GridItemWrapper>
        </ResponsiveGridLayout>
      </Root>
    </div>
  )
}
        
export default FriendsMemories;
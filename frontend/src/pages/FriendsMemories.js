import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GridLayout, Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import "../styles/FriendsMemories.css";

function FriendsMemories() {
  const {ID} = useParams();
  //const post = drawings[ID] 
  //These are how I carried the user selected between pages in comments 
  //I left them for reference if you wish to do them similarly

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
  `;

  return (
    <div className="FriendsMemoriesDiv">
      <div className="Title">
        User {ID}'s Drawings
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
              Report Innappropriate Drawing
            </GridItemContent>
          </GridItemWrapper>
          <GridItemWrapper key="dark-magician">
            <GridItemContent>
              <img src="PLACEHOLDER" alt={"Missing image"}/> <br></br>
              Drawn on: DD/MM/YYYY <br></br>
              Report Innappropriate Drawing
            </GridItemContent>
          </GridItemWrapper>
          <GridItemWrapper key="kuriboh">
            <GridItemContent>
              <img src="PLACEHOLDER" alt={"Missing image"}/> <br></br>
              Drawn on: DD/MM/YYYY <br></br>
              Report Innappropriate Drawing
            </GridItemContent>
          </GridItemWrapper>
          <GridItemWrapper key="spell-caster">
            <GridItemContent>
              <img src="PLACEHOLDER" alt={"Missing image"}/> <br></br>
              Drawn on: DD/MM/YYYY <br></br>
              Report Innappropriate Drawing
            </GridItemContent>
          </GridItemWrapper>
          <GridItemWrapper key="summoned-skull">
            <GridItemContent>
              <img src="PLACEHOLDER" alt={"Missing image"}/> <br></br>
              Drawn on: DD/MM/YYYY <br></br>
              Report Innappropriate Drawing
            </GridItemContent>
          </GridItemWrapper>
        </ResponsiveGridLayout>
      </Root>
    </div>
  )
}
        
export default FriendsMemories;
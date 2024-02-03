import react from 'react';
import interfaceImg from "./assets-pages/interface.jpg";
import {Container, Row} from 'react-bootstrap';
import openFileVid from "./assets-pages/openFile.mp4";

export function Proj1() {
    return (
    <section className="proj1">    
        <Container>
         
            <div>
            <Row>
                <h1>Notepad Online</h1>
                <p>A web based Notepad made using JS and .NET Framework. Stores .txt files on Azure Container</p>

                
                <h2 style={{paddingTop:"40px"}}>User Interface:</h2>
                <p></p>
                <img src={interfaceImg} className="interface-image"/>
            </Row>
            <Row>
                <h2 >Features:</h2>

                <h5>Opening a previously saved file</h5>
                <p>Open file from the dropdown list. All the files shown are stored as blobs on Azure Storage Containter. 
                Clicking on the dropdown option loads the azure blob stored on cloud</p>
                <video width="640" height="480" controls>
                    <source src={openFileVid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Row>
            </div>
        </Container>
    </section>
    )
}


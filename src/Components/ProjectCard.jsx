import {Col} from 'react-bootstrap';

export const ProjectCard = ({ title, description, imgUrl, link }) => {

    return (
        <Col sm ={6} md={4}>
        <a href={link} target="_blank" rel="noopener noreferrer">
                <div className="proj-imgbox">
                    <img src={imgUrl}  className="project-image"/>
                    <div className="proj-txtx">
                        <h4>{title}</h4>
                        <span style={{ paddingLeft: '11px', paddingRight: '11px' }}>{description}</span>
                </div>
            </div>

            </a>
        </Col>
    )

}
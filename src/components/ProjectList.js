import React from "react";
import Header from "./Header";
import {Container, Table, Row, Col , OverlayTrigger , Tooltip} from "react-bootstrap";
import pdfIcon from "../assets/pdf.png";
import pdfGenerator from "../Services/pdfGenerator";

const ProjectListComponent = (props) => {
    return(
        <section>
            <Header/>
            <div className="my-4">
                <Container>
                    <h2 className="text-center">Project List</h2>
                    {props.projectList.length ?
                        <Row>
                            <Col className="d-flex justify-content-md-end">
                                <OverlayTrigger
                                    key="export"
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-top">Export as pdf</Tooltip>}
                                >
                                    <img src={pdfIcon}
                                         alt="pdf"
                                         height={45}
                                         style={{ cursor: "pointer" }}
                                         onClick={() => pdfGenerator(props.projectList)}
                                    />
                                </OverlayTrigger>
                            </Col>
                        </Row> : <></>
                    }
                    <div className="my-3">
                        <Table striped bordered hover responsive>
                            <thead className="text-center">
                                <tr>
                                    <th>Project Id</th>
                                    <th>Project Name</th>
                                    <th>Project Description</th>
                                    <th>Client</th>
                                    <th>Contractor</th>
                                    <th>Max X</th>
                                    <th>Min X</th>
                                    <th>Max Y</th>
                                    <th>Min Y</th>
                                    <th>Max Z</th>
                                    <th>Min Z</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {props.projectList.length ?
                                    (
                                        props.projectList.map((project) => (
                                            <tr key={project.id}>
                                                <td>{project.id}</td>
                                                <td>{project.projectName}</td>
                                                <td>{project.projectDescription}</td>
                                                <td>{project.client}</td>
                                                <td>{project.contractor}</td>
                                                <td>{project.maxX}</td>
                                                <td>{project.minX}</td>
                                                <td>{project.maxY}</td>
                                                <td>{project.minY}</td>
                                                <td>{project.maxZ}</td>
                                                <td>{project.minZ}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="11">No Data Found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default ProjectListComponent;
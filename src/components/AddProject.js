import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import {Container, Form ,Row,Col, Button} from "react-bootstrap";
import XLSX from "xlsx";

const AddProject = (props) => {
    const navigate = useNavigate();
    const [projectName , setProjectName] = useState("");
    const [projectDesc , setProjectDesc] = useState("");
    const [client , setClient] = useState("");
    const [contractor , setContractor] = useState("");
    const [nextPage, setNextPage] = useState(false);
    const [fileField, setFileField] = useState(null);
    const [maxX, setMaxX] = useState("");
    const [minX, setMinX] = useState("");
    const [maxY, setMaxY] = useState("");
    const [minY, setMinY] = useState("");
    const [maxZ, setMaxZ] = useState("");
    const [minZ, setMinZ] = useState("");

    /** handle CSV File Upload **/
    const handleFileUpload = (e) => {
        setFileField(e.target.files[0]);
        if(e.target.files[0] && e.target.files[0].type.includes("csv")){
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;

                // Parse CSV data using SheetJS
                const workbook = XLSX.read(content, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // This is an array containing the parsed CSV data

                const xValues = parsedData.map((data) => data[1]);
                xValues.shift();
                setMinX(Math.min(...xValues));
                setMaxX(Math.max(...xValues));
                const yValues = parsedData.map((data) => data[2]);
                yValues.shift();
                setMinY(Math.min(...yValues));
                setMaxY(Math.max(...yValues));
                const zValues = parsedData.map((data) => data[3]);
                zValues.shift();
                setMinZ(Math.min(...zValues));
                setMaxZ(Math.max(...zValues));
                //let maxValue = Math.max(...xValues);
                //console.log("x:",minValue , maxValue)
            };
            reader.readAsBinaryString(e.target.files[0]);
        }else {
            setMinX("");
            setMaxX("");
            setMinY("");
            setMaxY("");
            setMinZ("");
            setMaxZ("");
        }
    };
    /** Handle Submit Response **/
    const handleAddProject = (e) => {
        e.preventDefault();
        const projectDetails = {
            id : props.projectList.length + 1,
            projectName: projectName,
            projectDescription: projectDesc,
            client: client,
            contractor:contractor,
            maxX: maxX,
            minX: minX,
            maxY: maxY,
            minY: minY,
            maxZ: maxZ,
            minZ: minZ
        }
        props.setProjectList([...props.projectList,projectDetails]);
        navigate("/projectList");
    }

    return(
        <section>
            <Header/>
            <div className="my-4">
                <Container>
                    <h2 className="text-center">Add Project</h2>
                    <div className="mt-4">
                        <h5>{!nextPage ? "Step-1" : "Step-2"}</h5>
                        <Form className="my-3" onSubmit={(e) => {
                            e.preventDefault();
                            setNextPage(true);
                        }}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Project Name" value={projectName}
                                                  onChange={(e) => setProjectName(e.target.value)}
                                                  disabled={nextPage} required
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter Project Description" style={{ height: "70px" }}
                                              value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)}
                                              disabled={nextPage} required
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Client</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Client" value={client}
                                                  onChange={(e) => setClient(e.target.value)} disabled={nextPage} required
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Contractor</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Contractor" value={contractor}
                                                  onChange={(e) => setContractor(e.target.value)} disabled={nextPage} required
                                    />
                                </Form.Group>
                            </Row>

                            {!nextPage ?
                                <Row className="mt-3">
                                    <Col className="d-flex justify-content-end">
                                        <button type="submit">Next Step>></button>
                                    </Col>
                                </Row> : <></>
                            }
                        </Form>
                        {nextPage ?
                            <Form onSubmit={handleAddProject}>
                                <Row>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>File Upload</Form.Label>
                                        <label
                                            className="pt-4 pb-4"
                                            htmlFor="inputTag"
                                            style={{
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "center",
                                                border: "1px solid #DCE0E4",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <span className="image-upload-text">+ Upload File</span>
                                                {fileField ? (
                                                    <p>
                                                        <b>Chosen file:</b> {fileField.name}
                                                    </p>
                                                ) : (
                                                    <p>
                                                        <b>Chosen file:</b> No file chosen yet
                                                    </p>
                                                )}
                                            </div>
                                            <input
                                                id="inputTag"
                                                type={"file"}
                                                accept={".csv"}
                                                style={{ display: "none" }}
                                                required
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Max X</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Max X" value={maxX} onChange={(e) => setMaxX(e.target.value)} required/>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Min X</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Min X" value={minX} onChange={(e) => setMinX(e.target.value)} required/>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Max Y</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Max Y" value={maxY} onChange={(e) => setMaxY(e.target.value)} required/>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Min Y</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Min Y" value={minY} onChange={(e) => setMinY(e.target.value)} required/>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Max Z</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Max Z" value={maxZ} onChange={(e) => setMaxZ(e.target.value)} required/>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Min Z</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Min Z" value={minZ} onChange={(e) => setMinZ(e.target.value)} required/>
                                    </Form.Group>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="d-flex justify-content-center">
                                        <Button variant="primary" type="submit">
                                            Submit Your Response
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="">
                                        <button onClick={() => setNextPage(false)}> {"<<"} Back To Previous Step</button>
                                    </Col>
                                </Row>
                            </Form>
                            : <></>}
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default AddProject;
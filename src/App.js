import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProject from "./components/AddProject";
import ProjectListComponent from "./components/ProjectList";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
    const [projectList , setProjectList] = useLocalStorage("projectList" , []);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AddProject projectList={projectList} setProjectList={setProjectList}></AddProject>} />
                    <Route path="/projectList" element={<ProjectListComponent projectList={projectList}></ProjectListComponent>} />
                    <Route path="*" element={ <p>404 NOT FOUND</p>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;

import React from 'react';
import testImg from './test.jpg';
import ProjectCard from './ProjectCard';

const Projects = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
            Projects
            </h1>
            <div class="row">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </div>
    );
};

export default Projects;
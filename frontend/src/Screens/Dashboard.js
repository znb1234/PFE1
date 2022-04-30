import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import "@progress/kendo-theme-material/dist/all.css";
import "../components/Dashboard.css";
import ActiveJobs from "../components/ActiveJobs";
import TotalJobViews from "../components/TotalJobViews";
import MostPopularJob from "../components/MostPopularJob";
import JobCredits from "../components/JobCredits";
const WidgetOne = () => <div>Widget one</div>;
const WidgetTwo = () => <div>Widget two</div>;
const initialPositions = [
    {
        col: 1,
        colSpan: 2,
        rowSpan: 2,
    },
    {
        col: 3,
        colSpan: 1,
        rowSpan: 1,
    },
    {
        col: 4,
        colSpan: 1,
        rowSpan: 1,
    },
    {
        col: 3,
        colSpan: 2,
        rowSpan: 2,
    },
];

const getPositions = initialPositions => {
    // Try to get positions from local storage
    // If we have none in the storage then default to initial positions
    return (
        JSON.parse(localStorage.getItem("dashboard-positions")) || initialPositions
    );
};
function Dashboard() {
    const [positions, setPositions] = useState(initialPositions);

    const widgets = [
        {
            header: "nombre totale des utilisateurs ",
            body: <TotalJobViews />,
        },
        {
            header: "les utilisateurs actives",
            body: <ActiveJobs />,
        },
        {
            header: "Widget two header",
            body: <JobCredits />,
        },
        {
            header: "Widg",
            body: <MostPopularJob />,
        },
    ];

    const handleReposition = e => {
        setPositions(e.value);
    };

    return (
        <div className='dashboard'>
            <Container>
                Dashboard
            </Container>
            <h1>dashboard</h1>
            <TileLayout
                className="tileLayout"
                columns={4}
                rowHeight={255}
                gap={{ rows: 10, columns: 10 }}
                positions={positions}
                items={widgets}
                onReposition={handleReposition}
            />
        </div>
    )
}
export default Dashboard
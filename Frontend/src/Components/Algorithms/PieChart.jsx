import React from "react";
import PropTypes from "prop-types";
import Chart from "react-google-charts";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    graph: {
        width: "100%",
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        padding: "0 10px",
    },
    header: {
        marginBottom: 15,
        fontSize: 45,
        color: "#fff",
    },
}));

const PieChart = ({ hit = 0, fault = 0 }) => {
    const classes = useStyles();

    const pieData = [
        ["Page Sequence", "Hit/Fault"],
        ["Hit", hit],
        ["Fault", fault],
    ];

    const pieOptions = {
        title: "Hit Vs Fault Comparison",
        is3D: true,
        backgroundColor: "#1a202c",
        titleTextStyle: {
            color: "#fff",
            fontSize: 24,
        },
        pieSliceTextStyle: {
            color: "black",
            fontSize: 20,
        },
        slices: {
            0: { color: "#7C99AC" },
            1: { color: "#FFCDDD" },
        },
        legend: {
            textStyle: {
                color: "white",
            },
        },
    };

    return (
        <Box className={classes.graph}>
            <Typography className={classes.header}>Pie Chart</Typography>
            <Chart
                width={"100%"}
                height={"500px"}
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={pieData}
                options={pieOptions}
                rootProps={{ "data-testid": "3" }}
            />
        </Box>
    );
};

PieChart.propTypes = {
    hit: PropTypes.number,
    fault: PropTypes.number,
};

export default PieChart;
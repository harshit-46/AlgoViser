import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import PieChart from "./PieChart";
import TableHeader from "./TableHeader";
import RowResultMaker from "./RowResultMaker";

const useStyles = makeStyles((theme) => ({
    table: {
        width: "100%",
        fontFamily: "arial, sans-serif",
        borderCollapse: "collapse",
        marginTop: 40,
        marginBottom: 40,
        fontSize: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            fontSize: 12,
            width: "100%",
            padding: "0 10px",
        },
    },
    result: {
        "& tr:nth-child(even)": {
            backgroundColor: "#273c3c",
        },
    },
    main: {
        border: "1px solid #dddddd",
        textAlign: "center",
        padding: "10px",
    },
    summary: {
        textAlign: "center",
        marginTop: 30,
        border: "1px solid white",
        borderRadius: "25px",
        [theme.breakpoints.down("sm")]: {
            padding: 10,
        },
    },
    header: {
        fontSize: 46,
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            fontSize: 28,
        },
    },
    sum: {
        padding: "40px",
        [theme.breakpoints.down("sm")]: {
            padding: "20px",
        },
    },
    sumText: {
        fontSize: 30,
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
            fontSize: 20,
            textAlign: "center",
        },
    },
    chart: {
        width: "100%",
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
}));

const LRU = (props) => {
    const classes = useStyles();

    const frames = props.frame;

    const pageSeq = props.seq;

    let arr = [];
    for (let i = 0; i < frames; i++) arr.push(i + 1);

    const frameCreator = (f) => {
        return (
            <>
                {f.map((item, index) => {
                    return (
                        <th
                            className={classes.main}
                            style={{
                                backgroundColor: "#273c3c",
                            }}
                        >{`FRAME ${item}`}</th>
                    );
                })}
            </>
        );
    };

    const findLru = (temp, frame) => {
        let minimum = temp[0];
        let pos = 0;

        for (let i = 0; i < frame; i++) {
            if (temp[i] < minimum) {
                minimum = temp[i];
                pos = i;
            }
        }
        return pos;
    };

    const lruResultMaker = (frame, seq) => {
        console.log("LRU Result Maker");
        let temp = [];
        let flag1;
        let flag2;

        let pos;

        let faults = 0;
        let counter = 0;
        let result = [];
        let frame_arr = [];
        let hit;
        let fault;
        let index_arr = [];

        for (let i = 0; i < frames; i++)
            frame_arr[i] = -1;

        for (let i = 0; i < seq.length; i++) {
            flag1 = 0;
            flag2 = 0;
            hit = false;
            fault = false;

            for (let j = 0; j < frame; j++) {
                if (seq[i] === frame_arr[j]) {
                    counter++;
                    temp[j] = counter;
                    index_arr.push(j);
                    flag1 = 1;
                    flag2 = 1;
                    hit = true;
                    break;
                }
            }

            if (flag1 === 0) {
                for (let j = 0; j < frame; j++) {
                    if (frame_arr[j] === -1) {
                        faults++;
                        frame_arr[j] = seq[i];
                        index_arr.push(j);
                        counter++;
                        temp[j] = counter;
                        flag2 = 1;
                        fault = true;
                        break;
                    }
                }
            }

            if (flag2 === 0) {
                pos = findLru(temp, frame);
                faults++;
                counter++;
                temp[pos] = counter;
                frame_arr[pos] = seq[i];
                index_arr.push(pos);
                fault = true;
            }

            let elements = [];
            elements.push(`P${i + 1}   (${seq[i]})`);
            for (let j = 0; j < frame; j++) elements.push(frame_arr[j]);

            if (hit === true) elements.push("HIT");
            else if (fault === true) elements.push("FAULT");

            result.push(elements);
        }

        return { result, faults, index_arr };
    };

    const { result, faults, index_arr } = lruResultMaker(frames, pageSeq);

    const pageHits = pageSeq.length - faults;

    return (
        <>
            <TableHeader algoName={"LRU (Least Recently Used)"} />

            <Box className={classes.table}>
                <table style={{ overflowX: "auto" }}>
                    <thead>
                        <tr>
                            <th
                                className={classes.main}
                                style={{
                                    backgroundColor: "#273c3c",

                                    padding: "20px",
                                }}
                            >
                                PAGES
                            </th>
                            {frameCreator(arr)}
                            <th
                                className={classes.main}
                                style={{
                                    backgroundColor: "#273c3c",

                                    padding: "20px",
                                }}
                            >
                                RESULT
                            </th>
                        </tr>
                    </thead>

                    <tbody className={classes.result}>
                        {<RowResultMaker result={result} index_arr={index_arr} />}
                    </tbody>
                </table>
                <Box className={classes.summary}>
                    <Box style={{ textAlign: "center", marginTop: 14 }}>
                        <Typography className={classes.header}>Summary</Typography>
                    </Box>
                    <Box className={classes.sum}>
                        <Typography className={classes.sumText}>
                            Total Frames: {props.frame}
                        </Typography>
                        <Typography className={classes.sumText}>
                            Total Pages: {props.seq.length}
                        </Typography>
                        <Typography className={classes.sumText}>
                            Page Sequence: {props.mainSeq}
                        </Typography>
                        <Typography className={classes.sumText}>
                            Page Hit: {pageHits}
                        </Typography>
                        <Typography className={classes.sumText}>
                            Page Faults: {faults}
                        </Typography>
                    </Box>

                    <Box className={classes.chart}>
                        <PieChart hit={pageHits} fault={faults} />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default LRU;
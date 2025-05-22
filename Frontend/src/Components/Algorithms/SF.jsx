import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import TableHeader from "./TableHeader";
import PieChart from "./PieChart";

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
    },
    header: {
        fontSize: 46,
        textAlign: "center",
    },
    sum: {
        padding: "40px",
    },
    sumText: {
        fontSize: 30,
        textAlign: "left",
    },
}));

const SF = (props) => {
    const classes = useStyles();

    const frames = props.frame;
    const pageSeq = props.seq;

    const frameCreator = (f) => {
        return (
            <>
                {f.map((item, index) => (
                    <th className={classes.main} style={{ backgroundColor: "#273c3c" }}>
                        {`FRAME ${item}`}
                    </th>
                ))}
            </>
        );
    };

    // Custom Algorithm
    const FARAlgo = (frame, seq) => {
        let memory = [];
        let pageFaults = 0;
        let result = [];
        let index_arr = [];

        let frequency = {};
        let lastUsed = {};

        for (let i = 0; i < seq.length; i++) {
            const currentPage = seq[i];
            let hit = false;

            frequency[currentPage] = (frequency[currentPage] || 0) + 1;
            lastUsed[currentPage] = i;

            if (memory.includes(currentPage)) {
                hit = true;
            } else {
                pageFaults++;
                if (memory.length < frame) {
                    memory.push(currentPage);
                } else {
                    let minScore = Infinity;
                    let evictIndex = -1;
                    for (let j = 0; j < memory.length; j++) {
                        let page = memory[j];
                        let score = frequency[page] - (i - lastUsed[page]);
                        if (score < minScore) {
                            minScore = score;
                            evictIndex = j;
                        }
                    }
                    memory[evictIndex] = currentPage;
                }
            }

            let row = [`P${i + 1}   (${currentPage})`, ...memory];
            row.push(hit ? "HIT" : "FAULT");
            result.push(row);

            index_arr.push(memory.indexOf(currentPage));
        }

        return { result, pageFaults, index_arr };
    };

    const rowResultMaker = (frames, pageSeq) => {
        const { result, index_arr } = FARAlgo(frames, pageSeq);

        return (
            <>
                {result.map((item, index) => {
                    let lastEle = item[item.length - 1];
                    return (
                        <tr>
                            {item.map((i, ind) => {
                                return (
                                    <td
                                        className={classes.main}
                                        style={{
                                            backgroundColor:
                                                ind === index_arr[index] + 1
                                                    ? lastEle === "HIT"
                                                        ? "rgb(105 228 0 / 86%)"
                                                        : "#fa2c2c"
                                                    : ind === item.length - 1
                                                        ? lastEle === "HIT"
                                                            ? "#7C99AC"
                                                            : "#FFCDDD"
                                                        : "inherit",
                                            border:
                                                ind !== item.length - 1
                                                    ? "1px solid white"
                                                    : "1px solid black",
                                            color: ind !== item.length - 1 ? "inherit" : "black",
                                        }}
                                    >
                                        {i}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </>
        );
    };

    const arr = Array.from({ length: frames }, (_, i) => i + 1);
    const { pageFaults } = FARAlgo(frames, pageSeq);
    const pageHits = pageSeq.length - pageFaults;

    return (
        <>
            <TableHeader algoName={"SF (Smart Fit Algorithm)"} />
            <Box className={classes.table}>
                <table>
                    <thead>
                        <tr>
                            <th className={classes.main} style={{ backgroundColor: "#273c3c", padding: "20px" }}>
                                PAGES
                            </th>
                            {frameCreator(arr)}
                            <th className={classes.main} style={{ backgroundColor: "#273c3c", padding: "20px" }}>
                                RESULT
                            </th>
                        </tr>
                    </thead>
                    <tbody className={classes.result}>{rowResultMaker(frames, pageSeq)}</tbody>
                </table>

                <Box className={classes.summary}>
                    <Typography className={classes.header}>Summary</Typography>
                    <Box className={classes.sum}>
                        <Typography className={classes.sumText}>Total Frames: {props.frame}</Typography>
                        <Typography className={classes.sumText}>Total Pages: {props.seq.length}</Typography>
                        <Typography className={classes.sumText}>Page Sequence: {props.mainSeq}</Typography>
                        <Typography className={classes.sumText}>Page Hit: {pageHits}</Typography>
                        <Typography className={classes.sumText}>Page Faults: {pageFaults}</Typography>
                    </Box>
                    <Box className={classes.chart}>
                        <PieChart hit={pageHits} fault={pageFaults} />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default SF;
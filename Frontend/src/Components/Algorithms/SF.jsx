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

const SF = (props) => {
    const classes = useStyles();

    const frames = props.frame;
    const pageSeq = props.seq;

    const frameCreator = (f) => (
        <>
            {f.map((item, index) => (
                <th key={index} className={classes.main} style={{ backgroundColor: "#273c3c" }}>
                    {`FRAME ${item}`}
                </th>
            ))}
        </>
    );

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

            const row = [`P${i + 1} (${currentPage})`, ...memory, hit ? "HIT" : "FAULT"];
            result.push(row);
            index_arr.push(memory.indexOf(currentPage));
        }

        return { result, pageFaults, index_arr };
    };

    const rowResultMaker = (frames, pageSeq) => {
        const { result, index_arr } = FARAlgo(frames, pageSeq);

        return (
            <>
                {result.map((row, rowIndex) => {
                    const resultLabel = row[row.length - 1];
                    return (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => {
                                const isLast = colIndex === row.length - 1;
                                const isHit = resultLabel === "HIT";
                                const isTargetCell = colIndex === index_arr[rowIndex] + 1;

                                let bgColor = "inherit";
                                if (isLast) bgColor = isHit ? "#7C99AC" : "#FFCDDD";
                                if (isTargetCell) bgColor = isHit ? "rgb(105 228 0 / 86%)" : "#fa2c2c";

                                return (
                                    <td
                                        key={colIndex}
                                        className={classes.main}
                                        style={{
                                            backgroundColor: bgColor,
                                            border: isLast ? "1px solid black" : "1px solid white",
                                            color: isLast ? "black" : "inherit",
                                        }}
                                    >
                                        {cell}
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
                <Box className={classes.scrollWrapper}>
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
                </Box>

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

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
        }
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

const FIFO = (props) => {
    const classes = useStyles();
    const frames = props.frame;
    const pageSeq = props.seq;

    const frameHeaders = Array.from({ length: frames }, (_, i) => i + 1);

    const fifoResultGiver = (frame, seq) => {
        let pageFaults = 0;
        let temp = Array(frame).fill(-1);
        let result = [];
        let index_arr = [];

        for (let i = 0; i < seq.length; i++) {
            let hit = false;
            let fault = false;
            let flag = 0;

            for (let j = 0; j < frame; j++) {
                if (seq[i] === temp[j]) {
                    flag++;
                    index_arr.push(j);
                    pageFaults--;
                    hit = true;
                    break;
                }
            }

            pageFaults++;
            fault = true;

            if (pageFaults <= frame && flag === 0) {
                temp[i] = seq[i];
                index_arr.push(i);
            } else if (flag === 0) {
                const replaceIndex = (pageFaults - 1) % frame;
                temp[replaceIndex] = seq[i];
                index_arr.push(replaceIndex);
            }

            const row = [`P${i + 1} (${seq[i]})`, ...temp];
            row.push(hit ? "HIT" : "FAULT");
            result.push(row);
        }

        return { result, pageFaults, index_arr };
    };

    const { result, pageFaults, index_arr } = fifoResultGiver(frames, pageSeq);
    const pageHits = pageSeq.length - pageFaults;

    const renderCell = (value, ind, lastLabel, highlightIndex) => {
        const isResultCol = ind === lastLabel.length - 1;
        const isHit = lastLabel === "HIT";

        let style = {
            backgroundColor: isResultCol
                ? isHit
                    ? "#7C99AC"
                    : "#FFCDDD"
                : "inherit",
            border: isResultCol ? "1px solid black" : "1px solid white",
            color: isResultCol ? "black" : "inherit",
        };

        if (ind === highlightIndex + 1) {
            style.backgroundColor = isHit ? "rgb(105 228 0 / 86%)" : "#fa2c2c";
        }

        return (
            <td key={ind} className={classes.main} style={style}>
                {value}
            </td>
        );
    };

    return (
        <>
            <TableHeader algoName={"FCFS (First Come First Serve)"} />

            <Box className={classes.table}>
                <table>
                    <thead>
                        <tr>
                            <th className={classes.main} style={{ backgroundColor: "#273c3c", padding: "20px" }}>
                                PAGES
                            </th>
                            {frameHeaders.map((f, i) => (
                                <th key={i} className={classes.main} style={{ backgroundColor: "#273c3c" }}>
                                    FRAME {f}
                                </th>
                            ))}
                            <th className={classes.main} style={{ backgroundColor: "#273c3c", padding: "20px" }}>
                                RESULT
                            </th>
                        </tr>
                    </thead>

                    <tbody className={classes.result}>
                        {result.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) =>
                                    renderCell(cell, colIndex, row[row.length - 1], index_arr[rowIndex])
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Box className={classes.summary}>
                    <Box style={{ textAlign: "center", marginTop: 14 }}>
                        <Typography className={classes.header}>Summary</Typography>
                    </Box>
                    <Box className={classes.sum}>
                        <Typography className={classes.sumText}>Total Frames: {frames}</Typography>
                        <Typography className={classes.sumText}>Total Pages: {pageSeq.length}</Typography>
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

export default FIFO;




/*

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
            padding: "0 10px",
        },
    },
    scrollWrapper: {
        overflowX: "auto",
        width: "100%",
    },
    thead: {
        position: "sticky",
        top: 0,
        backgroundColor: "#273c3c",
        zIndex: 1,
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
        [theme.breakpoints.down("sm")]: {
            padding: "6px",
        },
    },
    summary: {
        textAlign: "center",
        marginTop: 30,
        border: "1px solid white",
        borderRadius: "25px",
        width: "100%",
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
            padding: "20px 10px",
        },
    },
    sumText: {
        fontSize: 30,
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
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

const FIFO = (props) => {
    const classes = useStyles();
    const frames = props.frame;
    const pageSeq = props.seq;

    const frameHeaders = Array.from({ length: frames }, (_, i) => i + 1);

    const fifoResultGiver = (frame, seq) => {
        let pageFaults = 0;
        let temp = Array(frame).fill(-1);
        let result = [];
        let index_arr = [];

        for (let i = 0; i < seq.length; i++) {
            let hit = false;

            if (!temp.includes(seq[i])) {
                pageFaults++;
                if (temp.includes(-1)) {
                    const emptyIndex = temp.indexOf(-1);
                    temp[emptyIndex] = seq[i];
                    index_arr.push(emptyIndex);
                } else {
                    const replaceIndex = (pageFaults - 1) % frame;
                    temp[replaceIndex] = seq[i];
                    index_arr.push(replaceIndex);
                }
            } else {
                hit = true;
                index_arr.push(temp.indexOf(seq[i]));
            }

            const row = [`P${i + 1} (${seq[i]})`, ...temp];
            row.push(hit ? "HIT" : "FAULT");
            result.push(row);
        }

        return { result, pageFaults, index_arr };
    };

    const { result, pageFaults, index_arr } = fifoResultGiver(frames, pageSeq);
    const pageHits = pageSeq.length - pageFaults;

    const renderCell = (value, ind, lastLabel, highlightIndex) => {
        const isResultCol = ind === lastLabel.length - 1;
        const isHit = lastLabel === "HIT";

        let style = {
            backgroundColor: isResultCol
                ? isHit
                    ? "#7C99AC"
                    : "#FFCDDD"
                : "inherit",
            border: isResultCol ? "1px solid black" : "1px solid white",
            color: isResultCol ? "black" : "inherit",
        };

        if (ind === highlightIndex + 1) {
            style.backgroundColor = isHit ? "rgb(105 228 0 / 86%)" : "#fa2c2c";
        }

        return (
            <td key={ind} className={classes.main} style={style}>
                {value}
            </td>
        );
    };

    return (
        <>
            <TableHeader algoName={"FCFS (First Come First Serve)"} />

            <Box className={classes.table}>
                <Box className={classes.scrollWrapper}>
                    <table>
                        <thead className={classes.thead}>
                            <tr>
                                <th className={classes.main} style={{ backgroundColor: "#273c3c", padding: "20px" }}>
                                    PAGES
                                </th>
                                {frameHeaders.map((f, i) => (
                                    <th key={i} className={classes.main} style={{ backgroundColor: "#273c3c" }}>
                                        FRAME {f}
                                    </th>
                                ))}
                                <th className={classes.main} style={{ backgroundColor: "#273c3c", padding: "20px" }}>
                                    RESULT
                                </th>
                            </tr>
                        </thead>

                        <tbody className={classes.result}>
                            {result.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) =>
                                        renderCell(cell, colIndex, row[row.length - 1], index_arr[rowIndex])
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>

                <Box className={classes.summary}>
                    <Box style={{ textAlign: "center", marginTop: 14 }}>
                        <Typography className={classes.header}>Summary</Typography>
                    </Box>
                    <Box className={classes.sum}>
                        <Typography className={classes.sumText}>Total Frames: {frames}</Typography>
                        <Typography className={classes.sumText}>Total Pages: {pageSeq.length}</Typography>
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

export default FIFO;


*/
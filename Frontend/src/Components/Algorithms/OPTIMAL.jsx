import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import PieChart from "./PieChart";
import TableHeader from "./TableHeader";

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

const OPR = (props) => {
    const classes = useStyles();
    const frames = props.frame;
    const pageSeq = props.seq;

    let arr = [];
    for (let i = 0; i < frames; i++) {
        arr.push(i + 1);
    }

    const frameCreator = (f) => {
        return (
            <>
                {f.map((item) => (
                    <th
                        key={item}
                        className={classes.main}
                        style={{ backgroundColor: "#273c3c" }}
                    >{`FRAME ${item}`}</th>
                ))}
            </>
        );
    };

    const oprResultMaker = (frame, seq) => {
        let temp = [];
        let flag1, flag2, flag3, pos, max;
        let faults = 0;
        let result = [];
        let frame_arr = Array(frame).fill(-1);
        let index_arr = [];

        for (let i = 0; i < seq.length; i++) {
            flag1 = 0;
            flag2 = 0;
            let hit = false;
            let fault = false;

            for (let j = 0; j < frame; j++) {
                if (seq[i] === frame_arr[j]) {
                    flag1 = flag2 = 1;
                    hit = true;
                    index_arr.push(j);
                    break;
                }
            }

            if (flag1 === 0) {
                for (let j = 0; j < frame; j++) {
                    if (frame_arr[j] === -1) {
                        faults++;
                        frame_arr[j] = seq[i];
                        index_arr.push(j);
                        flag2 = 1;
                        fault = true;
                        break;
                    }
                }
            }

            if (flag2 === 0) {
                temp = Array(frame).fill(-1);
                for (let j = 0; j < frame; j++) {
                    for (let k = i + 1; k < seq.length; k++) {
                        if (frame_arr[j] === seq[k]) {
                            temp[j] = k;
                            break;
                        }
                    }
                }

                flag3 = 0;
                for (let j = 0; j < frame; j++) {
                    if (temp[j] === -1) {
                        pos = j;
                        flag3 = 1;
                        break;
                    }
                }

                if (flag3 === 0) {
                    max = temp[0];
                    pos = 0;
                    for (let j = 1; j < frame; j++) {
                        if (temp[j] > max) {
                            max = temp[j];
                            pos = j;
                        }
                    }
                }

                frame_arr[pos] = seq[i];
                index_arr.push(pos);
                faults++;
                fault = true;
            }

            let elements = [`P${i + 1}   (${seq[i]})`, ...frame_arr];
            elements.push(hit ? "HIT" : fault ? "FAULT" : "");
            result.push(elements);
        }

        return { result, faults, index_arr };
    };

    const rowResultMaker = (frame, seq) => {
        const { result, index_arr } = oprResultMaker(frame, seq);

        return (
            <>
                {result.map((item, index) => {
                    let lastEle = item[item.length - 1];
                    return (
                        <tr key={index}>
                            {item.map((i, ind) => (
                                <td
                                    key={ind}
                                    className={classes.main}
                                    style={{
                                        backgroundColor:
                                            ind !== index_arr[index] + 1
                                                ? ind === item.length - 1
                                                    ? lastEle === "HIT"
                                                        ? "#7C99AC"
                                                        : "#FFCDDD"
                                                    : "inherit"
                                                : lastEle === "HIT"
                                                ? "rgb(105 228 0 / 86%)"
                                                : "#fa2c2c",
                                        border:
                                            ind === item.length - 1
                                                ? "1px solid black"
                                                : "1px solid white",
                                        color: ind === item.length - 1 ? "black" : "inherit",
                                    }}
                                >
                                    {i}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </>
        );
    };

    const { faults } = oprResultMaker(frames, pageSeq);
    const pageHits = pageSeq.length - faults;

    return (
        <>
            <TableHeader algoName={"OPR (Optimal Page Replacement)"} />
            <Box className={classes.table}>
                <div className={classes.responsiveWrapper}>
                    <table style={{ margin: "0 auto" }}>
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
                        <tbody className={classes.result}>
                            {rowResultMaker(frames, pageSeq)}
                        </tbody>
                    </table>
                </div>

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

export default OPR;
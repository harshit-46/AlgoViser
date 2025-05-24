import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 20,
        color: "#fff",
    },
    descr: {
        marginTop: 20,
        textAlign: "center",
    },
    algo: {
        fontSize: 45,
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: 32,
        },
    },
}));

const TableHeader = ({ algoName, frame, page, pageSeq }) => {
    const classes = useStyles();

    return (
        <Box className={classes.mainContainer}>
            <Typography className={classes.algo}>{algoName}</Typography>

            {(frame || page || pageSeq) && (
                <Box className={classes.descr}>
                    {frame && <Typography variant="h6">Frames: {frame}</Typography>}
                    {page && <Typography variant="h6">Pages: {page}</Typography>}
                    {pageSeq && (
                        <Typography variant="h6">
                            Page Sequence: {pageSeq.join(", ")}
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

TableHeader.propTypes = {
    algoName: PropTypes.string.isRequired,
    frame: PropTypes.number,
    page: PropTypes.number,
    pageSeq: PropTypes.arrayOf(PropTypes.number),
};

export default TableHeader;
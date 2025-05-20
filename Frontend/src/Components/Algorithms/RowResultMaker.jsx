import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    main: {
        border: "1px solid #dddddd",
        textAlign: "center",
        padding: "10px",
    },
});

const RowResultMaker = ({ result, index_arr }) => {
    const classes = useStyles();

    return (
        <>
            {result.map((row, rowIndex) => {
                const lastEle = row[row.length - 1];

                return (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            const isStatusCell = colIndex === row.length - 1;
                            const isIndexMatch = colIndex === index_arr[rowIndex] + 1;
                            const isHit = lastEle === "HIT";

                            let cellStyle = {
                                backgroundColor: "inherit",
                                border: "1px solid white",
                                color: "inherit",
                            };

                            if (isStatusCell) {
                                cellStyle = {
                                    backgroundColor: isHit ? "#7C99AC" : "#FFCDDD",
                                    border: "1px solid black",
                                    color: "black",
                                };
                            }

                            if (isIndexMatch) {
                                cellStyle = {
                                    backgroundColor: isHit ? "rgb(105 228 0 / 86%)" : "#fa2c2c",
                                };
                            }

                            return (
                                <td key={colIndex} className={classes.main} style={cellStyle}>
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

export default RowResultMaker;

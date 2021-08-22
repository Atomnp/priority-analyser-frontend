import React from "react";
import Faq from "react-faq-component";
import {
    lightBlue,
    grey
  } from "@material-ui/core/colors";
import { useTheme } from '@material-ui/core/styles';
import { PredictionTable, BasicTable } from './table.js';
import Typography from "@material-ui/core/Typography";

const data = {
    title: "FAQ",
    rows: [
        {
            title: "How we predict the results?",
            content:<div>
                <p>First, we calculate the cutoff marks of each program, then remove the outliers and use the confidence interval to predict the result.</p>
                <PredictionTable/>
            </div>
        },
        {
            title: "How does analysis page works?",
            content: `It works on the basis of cutoff marks of each program and colleges. Here, we use range based bar graph to show cutoff marks of various programs and colleges.
            We also provide information about the number of seats available in the form of pie chart.`,
        },
        {
            title: "Does our calulation includes the various quota system of IOE?",
            content: `No, currently our system doesnot take quota system into consideration. We take them as outliers and do calulation accordingly.`,
        },
        {
            title: "What are the Full Form of colleges?",
            content: <div>
                <Typography variant="body1">The list of all the colleges of IOE with their code name and full form is shown below</Typography>
                <BasicTable college={true} />,
                </div>
        },
        {
            title: "What are the Full Form of programs?",
            content: <div>
                <Typography variant="body1">The list of all the programs of IOE with their code name and full form is shown below</Typography>
                <BasicTable college={false} />,
            </div>
        },
    ],
};

const styles = {
    bgColor: grey[50],
    titleTextColor: grey[900],
    // rowTitleColor: "blue",
    rowContentColor: grey[700],
    arrowColor: lightBlue[900],
};


const FAQ = ({setCurrentPage}) => {
    setCurrentPage("faq");
    const theme = useTheme();
    return (
        <div>
            <Faq
                data={data}
                styles={styles}
            />
        </div>
    );
};

export default FAQ;


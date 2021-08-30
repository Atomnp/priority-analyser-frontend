import React from "react";
import Faq from "react-faq-component";
import { lightBlue, grey } from "@material-ui/core/colors";
import { useTheme } from "@material-ui/core/styles";
import { PredictionTable, BasicTable } from "./table.js";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const data = {
  title: "FAQ",
  rows: [
    {
      title: "How we predict the results?",
      content: (
        <div>
          <p>
            First, we calculate the cutoff marks of each program, then remove
            the outliers and use the confidence interval to predict the result.
          </p>
          <PredictionTable />
        </div>
      ),
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
      content: (
        <div>
          <Typography variant="body1">
            The list of all the colleges of IOE with their code name and full
            form is shown below
          </Typography>
          <BasicTable college={true} />
        </div>
      ),
    },
    {
      title: "What are the Full Form of programs?",
      content: (
        <div>
          <Typography variant="body1">
            The list of all the programs of IOE with their code name and full
            form is shown below
          </Typography>
          <BasicTable college={false} />
        </div>
      ),
    },
  ],
};

const FAQ = ({ setCurrentPage }) => {
  setCurrentPage("faq");
  const theme = useTheme();

  const styles = {
    bgColor: theme.palette.background.default,
    titleTextColor: theme.palette.text.primary,
    rowTitleColor: theme.palette.text.primary,
    rowContentColor: theme.palette.text.secondary,
    arrowColor: theme.palette.secondary.main,
  };
  return (
    <div>
      <Container style={{ paddingBottom: "3rem" }} maxWidth="sm">
        <Faq data={data} styles={styles} />
      </Container>
    </div>
  );
};

export default FAQ;

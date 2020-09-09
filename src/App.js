import React, { useState, Fragment } from 'react';
import { CssBaseline, Container, Typography, Grid, Button, Box, Paper, AppBar, Toolbar } from '@material-ui/core';
import WordList from './WordList';

const randomWeighted = (items) => {
  let r = Math.random() * items.reduce((sum, item) => sum += item[1], 0);

  for(let item of items) {
    r -= item[1];

    if (r <= 0) {
      return item[0];
    }
  }
};

const selectName = (adjectives, nouns) => {
    if (!adjectives.length || !nouns.length) {
    return '';
  }

  return `${randomWeighted(adjectives)} ${randomWeighted(nouns)}`;
}

function App() {
  const [adjectives, setAdjectives] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    const result = selectName(adjectives, nouns);
    setSelectedName(result);
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6">
          Choosing a Team Name
        </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <CssBaseline />
        <Grid container justify="center" spacing={2} alignItems="stretch">
          <Grid item sm={6}>
            <WordList
              label="Add Adjective"
              title="adjectives"
              list={adjectives}
              onUpdate={setAdjectives} />
          </Grid>
          <Grid item sm={6}>
            <WordList
              label="Add Noun"
              title="nouns"
              list={nouns}
              onUpdate={setNouns} />
          </Grid>
        </Grid>
        <Button
          onClick={handleGenerate}
          variant="contained"
          color="secondary"
        >
          Generate Name
        </Button>
        {
          selectedName &&
          <Box my={3}>
            <Paper>
              <Box p={2}>
                <Typography variant="h4">
                  Your Team Name Is
                </Typography>
                <Typography variant="h6">
                  {selectedName}
                </Typography>
              </Box>
            </Paper>
          </Box>
        } 
      </Container>
    </Fragment>
  );
}

export default App;

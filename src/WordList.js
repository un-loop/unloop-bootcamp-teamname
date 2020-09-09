import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  List,
  ListItemText,
  ListItem,
  Typography,
  Paper,
  makeStyles,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  paper: {
    padding: theme.spacing(4),
    height: "100%",
  },
  title: {
    padding: theme.spacing(0, 0, 1),
    textTransform: "capitalize"
  },
  vote: {
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  }
}));

const WordList = ({list, onUpdate, title, label}) => {
  const [word, setWord] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setWord('');
  }, [list]);

  const handleAdd = useCallback((e) => {
    e.preventDefault();

    if (!word.trim()) {
      return;
    }

    const mapped = new Map([...list]);
    if (!mapped.has(word.trim())) {
      mapped.set(word, 0);
    }

    onUpdate && onUpdate([...mapped]);
  }, [onUpdate, list, word]);

  const handleVote = useCallback( (item, toAdd) => (e) => {
    e.preventDefault();
    const mapped = new Map([...list]);

    const result = mapped.get(item) + toAdd;

    if (result >= 0) {
      mapped.set(item, result);
      onUpdate && onUpdate([...mapped]);
    }    
  }, [onUpdate, list]);

  return (
    <Box className={classes.container} py={2}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          {title}
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
          <TextField
            variant="outlined"
            name="adjective"
            label={label}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Box>

        <List>
          {
            list.length ? 
              list.map(
                (item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item[0]} />
                  <ListItemSecondaryAction>
                    <Typography variant="body">
                      {item[1]}
                    </Typography>
                    <IconButton
                      className={classes.vote}
                      size="small"
                      edge="end"
                      onClick={handleVote(item[0], 1)}
                      >
                      <ArrowDropUp />
                    </IconButton>
                    <IconButton
                      className={classes.vote}
                      size="small"
                      edge="end"
                      onClick={handleVote(item[0], -1)}
                      >
                      <ArrowDropDown />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                )
              )
            :
            <Typography variant="body2">
              No items
            </Typography>
          }
        </List>
      </Paper>
    </Box>
  );
}

export default WordList;
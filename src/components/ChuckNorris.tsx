import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { getRamdomJoke } from '../services/axiosService';
import '../styles/ChuckNorris.css';
import RATE from '../models/rate.enum.ts';
//Button to generate new joke
/**
 * <Button variant="contained" color="success">
  Success
</Button>
 */

//icons
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const ChuckNorris = () => {
  const [joke, setJoke] = useState({ value: '', id: '', state: RATE.NONE });
  const [rateContent, setRateContent] = useState(
    <div>
      <ThumbUpOffAltIcon
        style={{ margin: '0 10px', cursor: 'pointer' }}
        onClick={() => rate(RATE.LIKE)}
      />
      <ThumbDownOffAltIcon
        style={{ margin: '0 10px', cursor: 'pointer' }}
        onClick={() => rate(RATE.DISLIKE)}
      />
    </div>
  );

  const [rateState, setRateState] = useState(RATE.NOTE);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  function rate(action) {
    switch (action) {
      case RATE.LIKE:
        setRateContent(
          <div>
            <ThumbUpAltIcon
              style={{ margin: '0 10px', cursor: 'pointer' }}
              onClick={() => rate(RATE.NONE)}
            />
            <ThumbDownOffAltIcon
              style={{ margin: '0 10px', cursor: 'pointer' }}
              onClick={() => rate(RATE.DISLIKE)}
            />
          </div>
        );
        setRateState(RATE.LIKE);
        break;
      case RATE.DISLIKE:
        setRateContent(
          <div>
            <ThumbUpOffAltIcon
              style={{ margin: '0 10px', cursor: 'pointer' }}
              onClick={() => rate(RATE.LIKE)}
            />
            <ThumbDownAltIcon
              style={{ margin: '0 10px', cursor: 'pointer' }}
              onClick={() => rate(RATE.NONE)}
            />
          </div>
        );
        setRateState(RATE.DISLIKE);

        break;
      case RATE.NONE:
        setRateContent(
          <div>
            <ThumbUpOffAltIcon
              style={{ margin: '0 10px', cursor: 'pointer' }}
              onClick={() => rate(RATE.LIKE)}
            />
            <ThumbDownOffAltIcon
              style={{ margin: '0 10px', cursor: 'pointer' }}
              onClick={() => rate(RATE.DISLIKE)}
            />
          </div>
        );
        setRateState(RATE.NONE);

        break;
    }
  }

  useEffect(() => {
    //console.log(rateState);
    obtainRamdomJoke();
  }, []);

  useEffect(() => {
    if (rateState === RATE.LIKE && joke.state != RATE.LIKE) {
      if (joke.state === RATE.DISLIKE) {
        setDislikes((pre) => pre - 1);
      }
      setLikes((pre) => pre + 1);
      setJoke((pre) => {
        return { ...pre, state: RATE.LIKE };
      });
    } else if (rateState === RATE.DISLIKE && joke.state != RATE.DISLIKE) {
      if (joke.state === RATE.LIKE) {
        setLikes((pre) => pre - 1);
      }
      setDislikes((pre) => pre + 1);
      setJoke((pre) => {
        return { ...pre, state: RATE.DISLIKE };
      });
    } else if (rateState === RATE.NONE) {
      if (joke.state === RATE.LIKE) {
        setLikes((pre) => pre - 1);
      } else if (joke.state === RATE.DISLIKE) {
        setDislikes((pre) => pre - 1);
      }
      setJoke((pre) => {
        return { ...pre, state: RATE.NONE };
      });
    }
  }, [rateState]);

  function obtainRamdomJoke() {
    getRamdomJoke()
      .then((response) => {
        if (response.status === 200) {
          setJoke({
            value: response.data.value,
            id: response.id,
            state: RATE.NONE,
          });
          rate(RATE.NONE);
          return;
        }

        alert(
          'Something went wrong when trying to get a ramdom joke: ' +
            err.message
        );
      })
      .catch((err) =>
        alert(
          'Something went wrong when trying to get a ramdom joke: ' +
            err.message
        )
      );
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Jokes about Chuck Norris</h1>
      <Button onClick={obtainRamdomJoke} variant="contained" color="success">
        Generate new joke
      </Button>
      <div className="joke-container">{joke.value}</div>
      <div className="like-box">{rateContent}</div>
      <div>
        <p>
          You like {likes} jokes and dislike {dislikes} jokes.
        </p>
      </div>
    </div>
  );
};

export default ChuckNorris;

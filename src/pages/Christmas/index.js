import { Box } from '@mui/system';
import { CONFIG_THEME } from 'config/constant';
import { motion } from 'framer-motion';
import React from 'react';
import Snowfall from 'react-snowfall';

const Christmas = () => {
  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        position: 'relative',
        backgroundColor: 'rgba(246,249,255,0.2)',
      }}
    >
      <Snowfall />
      <Box
        sx={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0.2) 10%, rgba(255,255,255,1)), url('/images/snowflakes.jpg')`,
          backgroundSize: 'cover',
          marginTop: '-200px',
        }}
      >
        <img
          src='/images/snowflakes.jpg'
          style={{ visibility: 'hidden' }}
          alt='hidden-img'
        />
      </Box>
      <Box
        sx={{
          maxWidth: CONFIG_THEME.maxWidth,
          margin: '0 auto',
          padding: '0px 100px',
        }}
      >
        <Box
          sx={{
            marginTop: '50px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
          >
            <Box
              sx={{
                backgroundColor: CONFIG_THEME.color.blue400,
                width: 'fit-content',
                padding: '3px',
                borderRadius: CONFIG_THEME.borderRadius,
              }}
            >
              <img
                src='/images/imageTree.jpg'
                style={{
                  width: '300px',
                  borderRadius: CONFIG_THEME.borderRadius,
                }}
                alt=''
              />
            </Box>
          </motion.div>
          <Box>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <span>Đây là đoạn giới thiệu tâm tình các kiểu ú ớ !!</span>
            </motion.div>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: CONFIG_THEME.maxWidth,
          margin: '0 auto',
          padding: '0px 100px',
        }}
      >
        <Box
          sx={{
            marginTop: '200px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 2 }}
              whileInView={{ opacity: 1 }}
            >
              <span>Đây là đoạn giới thiệu tâm tình các kiểu ú ớ !!</span>
            </motion.div>
          </Box>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 2.6 }}
            whileInView={{ opacity: 1 }}
          >
            <Box
              sx={{
                backgroundColor: CONFIG_THEME.color.blue400,
                width: 'fit-content',
                padding: '3px',
                borderRadius: CONFIG_THEME.borderRadius,
              }}
            >
              <img
                src='/images/imageTree.jpg'
                style={{
                  width: '300px',
                  borderRadius: CONFIG_THEME.borderRadius,
                }}
                alt=''
              />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Christmas;

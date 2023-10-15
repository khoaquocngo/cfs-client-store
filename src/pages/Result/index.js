import { Button, CircularProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { CONFIG_THEME } from 'config/constant';
import { getInfoByUuid } from 'datasource/firebase/ firestore/christmasForm';
import { motion } from 'framer-motion';
import React from 'react';
import Snowfall from 'react-snowfall';

const Result = () => {
  const [inp, setInp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState();
  const [success, setIsSuccess] = React.useState(false);

  const onChangeInput = e => {
    setInp(e.target.value);
  };

  const submitResult = async () => {
    setLoading(true);
    if (!inp || !inp.trim()) {
      alert('Nhập mã đi chứ!!');
      setLoading(false);
      return;
    }
    const { message, isSuccess, data } = await getInfoByUuid(inp);

    if (isSuccess) {
      setResult(data);
      setIsSuccess(true);
    } else {
      if (message === 'uuid not found!') {
        alert('Mã của bạn sai rồi !!');
      } else {
        alert(
          'OOppps!! Hình như bạn là người cuối cùng gửi quà và Santa chưa kịp gửi đi rồi. Chúc bạn giáng sinh an lành!! Quay lại ở những sự kiện sau cùng CVTConfession nhé!'
        );
      }
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        backgroundColor: 'rgba(246,249,255,0.2)',
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0.1) 10%, rgba(255,255,255,1)), url('/images/snowflakes.jpg')`,
          backgroundSize: 'cover',
          marginTop: '-100px',
          '@media (max-width: 600px)': {
            marginTop: '0px',
          },
        }}
      >
        <img
          src='/images/snowflakes.jpg'
          style={{ visibility: 'hidden' }}
          alt='hidden-img'
        />
      </Box>
      <Snowfall />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!success ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                '@media (max-width: 600px)': {
                  padding: '0px 25px',
                  justifyContent: 'flex-end',
                  mt: 5,
                },
              }}
            >
              <TextField
                color={'primary'}
                variant='outlined'
                label='Nhập mã của bạn tại đây nè!!'
                value={inp}
                onChange={onChangeInput}
                sx={{
                  minWidth: '500px',
                  '@media (max-width: 600px)': {
                    minWidth: '100%',
                  },
                  fieldset: {
                    borderWidth: '2px',
                    borderColor: CONFIG_THEME.color.blue900,
                  },
                }}
              ></TextField>
              <Button
                sx={{
                  ml: 2,
                  borderWidth: '2px',
                  height: '100%',
                  padding: '16px',
                  '@media (max-width: 600px)': {
                    padding: '10px',
                    height: 'fit-content',
                    ml: 0,
                    mt: 1,
                  },
                }}
                variant='contained'
                onClick={submitResult}
              >
                Xem kết quả
              </Button>
              {loading && <CircularProgress sx={{ ml: 2 }} />}
            </Box>
            <Box
              sx={{
                color: CONFIG_THEME.color.blue900,
                cursor: 'pointer',
                '&:hover': { color: CONFIG_THEME.color.blue500 },
                mt: 5,
              }}
            >
              <i
                onClick={() =>
                  window.open('https://www.facebook.com/CVTCFS', '_blank')
                }
              >
                Bạn quên mã thì liên hệ với page <strong>tại đây</strong> nhé!!
              </i>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'column',
              '@media (max-width: 600px)': {
                padding: '25px',
                justifyContent: 'flex-end',
              },
            }}
          >
            <Box
              sx={{
                color: CONFIG_THEME.color.blue900,
                fontWeight: 'bold',
                fontSize: '16px',
                fontStyle: 'italic',
                mb: 3,
              }}
            >
              _ Có người thủ thỉ gì cho bạn trong đêm giáng sinh nè!! _
            </Box>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.75,
                x: { duration: 0.5 },
                default: { ease: 'linear' },
              }}
            >
              <Box
                sx={{
                  border: '3px solid red',
                  borderColor: CONFIG_THEME.color.blue900,
                  borderRadius: '10px',
                  width: '550px',
                  padding: '50px',
                  '@media (max-width: 600px)': {
                    padding: '25px',
                    width: 'inherit',
                  },
                  '&>div': {
                    mb: 2,
                  },
                }}
              >
                <Box sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  {result?.displayName}
                </Box>
                <Box sx={{ color: CONFIG_THEME.color.blue900 }}>
                  {result?.contact}
                </Box>
                <Box sx={{ fontStyle: 'italic' }}>
                  <span style={{ color: CONFIG_THEME.color.blue900 }}>
                    Điều ước:
                  </span>
                  &nbsp;
                  {result?.dream}
                </Box>
                <Box>
                  <span style={{ color: CONFIG_THEME.color.blue900 }}>
                    Lời nhắn:
                  </span>
                  &nbsp;
                  {result?.message}
                </Box>
              </Box>
            </motion.div>
            <Box
              sx={{
                color: CONFIG_THEME.color.blue900,
                fontSize: '12px',
                fontStyle: 'italic',
                mt: 8,
                textAlign: 'right',
                padding: '10px',
                maxWidth: '600px',
                mb: 10,
              }}
            >
              Cảm ơn bạn đã tham gia 1 event nho nhỏ của CVT Confession, hi vọng
              bạn sẽ tiếp tục ủng hộ để bọn mình có thể tiếp tục làm những event
              xịn xò hơn nữa!!
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Result;

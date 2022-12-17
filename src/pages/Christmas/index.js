import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { CONFIG_THEME } from 'config/constant';
import { database } from 'datasource';
import { motion } from 'framer-motion';
import DiaglogSuccess from 'pages/Dialog';
import React, { useRef, useState } from 'react';
import Snowfall from 'react-snowfall';
const { ChristmasForm } = database;
const SEX = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

const Christmas = () => {
  const [name, setName] = useState('');
  const [dream, setDream] = useState('');
  const [contact, setContact] = useState('');
  const [quotes, setQoutes] = useState('');
  const [sex, setSex] = useState(SEX.MALE);
  const [uuid, setUiid] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const introducetRef = useRef(null);
  const formRef = useRef(null);

  const handleChangeValue = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case 'name': {
        setName(value);
        break;
      }
      case 'dream': {
        setDream(value);
        break;
      }
      case 'contact': {
        setContact(value);
        break;
      }
      case 'quotes': {
        setQoutes(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const scrollIntroduce = () => {
    if (introducetRef.current) {
      introducetRef.current.scrollIntoView();
    }
  };

  const scrollForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!name.trim() || !contact.trim() || !dream.trim() || !quotes.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const uuid = await ChristmasForm.createChristmasForm({
      displayName: name,
      contact: contact,
      dream: dream,
      message: quotes,
      sex,
    });

    if (uuid?.uuid) {
      setUiid(uuid?.uuid);
      setOpenDialog(true);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setOpenDialog(false);
    if (uuid) {
      setUiid('');
      setName('');
      setContact('');
      setDream('');
      setQoutes('');
      setSex(SEX.MALE);
    }
  };

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
      <Snowfall />
      <Box
        sx={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0.1) 10%, rgba(255,255,255,1)), url('/images/snowflakes.jpg')`,
          backgroundSize: 'cover',
          marginTop: '-200px',
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
      {/* ----Container------- */}
      <Box
        sx={{
          maxWidth: CONFIG_THEME.maxWidth,
          margin: '0 auto 200px',
          padding: '0px 100px',
          '@media (max-width: 600px)': {
            maxWidth: '100%',
            padding: '0px 25px',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            fontStyle: 'italic',
            color: CONFIG_THEME.color.blue900,
            '@media (max-width: 600px)': {
              fontSize: '12px',
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p>Xin chào tôt là SANTA Bóng ...đêm, và tôi đang cô đơn lắm!!</p>
            <p>
              Đêm giáng sinh đang tới, liệu bạn có một ước nguyện nhỏ nhoi nào
              đó!! Ví dụ tìm được một người ...{' '}
            </p>
            <p>
              để chia sẻ...{' '}
              <strong style={{ cursor: 'pointer' }} onClick={scrollIntroduce}>
                Thì đây
              </strong>
              !! Cơ hội tuyệt vời
            </p>
          </motion.div>
        </Box>
        <Divider
          sx={{
            margin: '150px auto 150px',
            backgroundColor: CONFIG_THEME.color.blue400,
            height: '3px',
            width: '350px',
            borderBottomWidth: 'inherit',
            '@media (max-width: 600px)': {
              margin: '100px auto',
            },
          }}
          ref={introducetRef}
        />
        <Box
          sx={{
            minWidth: '100%',
            color: CONFIG_THEME.color.blue900,
          }}
        >
          <p>
            Heyyyy, mọi người chỉ cần điền đầy đủ thông tin vào{' '}
            <strong style={{ cursor: 'pointer' }} onClick={scrollForm}>
              form bên dưới
            </strong>{' '}
            thì đã có thể gửi một lời nhắn đến bọn mình rồi nhaaaaa. Bọn mình sẽ
            cố gắng kết nối bạn đến với người giấu tên hehee. <br /> Và đừng
            quên để lại thông tin liên lạc nhé (cái đó là quan trọng nhất nè).
            Sau đó bạn chỉ cần chờ đợi và cùng 1 bạn nào đó đón Giáng sinh thật
            vui vui vui vui nhóoooo {`<33`}.
          </p>
        </Box>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '@media (max-width: 600px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: CONFIG_THEME.color.blue400,
              width: 'fit-content',
              padding: '3px',
              borderRadius: CONFIG_THEME.borderRadius,
              display: 'flex',
              height: 'fit-content',
              '@media (max-width: 600px)': {
                '& img': {
                  width: '300px',
                },
              },
            }}
          >
            <img
              src='/images/imageTree.jpg'
              style={{
                width: '500px',
                borderRadius: CONFIG_THEME.borderRadius,
              }}
              alt=''
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              p: 4,
              ml: 5,
              color: CONFIG_THEME.color.blue900,
              '@media (max-width: 600px)': {
                p: 1,
                m: 0,
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1,
                x: { duration: 1 },
                default: { ease: 'linear' },
              }}
            >
              <p>
                <strong>CÁCH THỨC HOẠT ĐỘNG:</strong>
              </p>
              <ul>
                <li>
                  Sau khi điền đầy đủ thông tin, các bạn sẽ nhận được một mã
                  code. Và ngay lúc này, nhiệm vụ của các bạn chính là giữ mã
                  code đấy lại và chờ 1 thông báo đến từ mã code đó nha. Đảm bảo
                  sẽ rất bất ngờ luôn!{' '}
                </li>
                <li>
                  Đến đêm 23/12, mã code ấy sẽ mang đến một bấtttttt ngờ cho bạn
                  đó, rồi rồi, thấy hồi hợp chưa nè ... Hãy nhớ{' '}
                  <strong>quay lại vào đêm Noel (23/12) vào lúc 20h30 </strong>
                  sẽ có bất ngờ dành cho mọi người. Không bất ngờ cứ đến tìm
                  admin, admin sẽ làm bạn bất ngờ :))))))).{' '}
                </li>
              </ul>
              <p>
                Chúng mình hi vọng các bạn sẽ tham gia một cách vui vẻ nhất. Có
                thể xem đây chính là món quà từ page gửi đến các bạn vào dịp
                Giáng sinh năm nay. Chúc các bạn có một đêm Giáng sinh thật hạnh
                phúc!
              </p>
              <p>
                P/S: Các bạn tham gia càng đông đổi lại thì BTC cũng nhận được
                nguồn động lực lớn để tiếp tục ra những event tiếp theo trong
                thời gian tới nữa á. Yêu rất nhiều.
              </p>
              <strong style={{ cursor: 'pointer' }} onClick={scrollForm}>
                Let's go!!
              </strong>
            </motion.div>
          </Box>
        </Box>

        <Divider
          sx={{
            margin: '150px auto',
            backgroundColor: CONFIG_THEME.color.blue400,
            height: '3px',
            width: '200px',
            borderBottomWidth: 'inherit',
            '@media (max-width: 600px)': {
              margin: '100px auto',
            },
          }}
          ref={formRef}
        />

        <Box>
          <Box
            sx={{
              display: 'flex',
              padding: '20px 0',
              '@media (max-width: 600px)': {
                flexDirection: 'column',
              },
            }}
          >
            <Box
              sx={{
                width: '50%',
                backgroundImage: 'url(/images/letter.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: CONFIG_THEME.borderRadius,
                position: 'relative',
                '@media (max-width: 600px)': {
                  width: '100%',
                },
              }}
            >
              <Snowfall />
              <img
                src='/images/letter.jpg'
                style={{ visibility: 'hidden' }}
                alt='hidden-img'
              />
            </Box>
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                padding: 4,
                '@media (max-width: 600px)': {
                  padding: 0,
                  width: '100%',
                },
                '& .MuiFormControlLabel-label': {
                  color: CONFIG_THEME.color.blue900,
                },
                '& .MuiFormControl-root': {
                  width: '100%',
                },
                '& .MuiFormLabel-root': {
                  color: CONFIG_THEME.color.blue900,
                },
                '& .MuiInputBase-root': {
                  backgroundColor: CONFIG_THEME.color.blue400,
                  color: CONFIG_THEME.color.blue900,
                  marginBottom: 2,
                  fontSize: '14px',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: CONFIG_THEME.color.blue900,
                    },
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid',
                  borderColor: CONFIG_THEME.color.blue400,
                  borderWidth: '1px !important',
                },
                '& textarea': {
                  fontSize: '14px',
                  backgroundColor: CONFIG_THEME.color.blue400,
                  color: CONFIG_THEME.color.blue900,
                  marginBottom: 2,
                  resize: 'none',
                  padding: 1,
                  borderRadius: '4px',
                  border: `1px solid ${CONFIG_THEME.color.blue400}`,
                  fontFamily: `Roboto, sans-serif`,
                  '&:focus-visible': {
                    borderColor: `${CONFIG_THEME.color.blue900}`,
                    outline: 'none',
                  },
                  '&::placeholder': {
                    color: CONFIG_THEME.color.blue900,
                  },
                },
              }}
            >
              <TextField
                id='outlined-basic'
                label='Họ và tên của kẻ cô độc giữa mùa đông lạnh giá ?? *'
                variant='outlined'
                value={name}
                onChange={e => handleChangeValue(e, 'name')}
                InputLabelProps={{ style: { fontSize: 14, fontWeight: 400 } }}
              />
              <RadioGroup
                row
                sx={{ mb: 2 }}
                value={sex}
                onChange={e => setSex(e.target.value)}
              >
                <FormControlLabel
                  value='Male'
                  control={<Radio />}
                  label='Nam'
                />
                <FormControlLabel
                  value='Female'
                  control={<Radio />}
                  label='Nữ'
                />
                <FormControlLabel
                  value='Other'
                  control={<Radio />}
                  label='Khác'
                />
              </RadioGroup>
              <TextareaAutosize
                id='outlined-basic'
                placeholder='Điều ước của ngươi là gì? *'
                variant='outlined'
                sx={{ width: '100%' }}
                minRows={4}
                value={dream}
                onChange={e => handleChangeValue(e, 'dream')}
              />
              <TextField
                id='outlined-basic'
                label='Info để Santa liên hệ, fb, zalo, sdt... *'
                variant='outlined'
                value={contact}
                onChange={e => handleChangeValue(e, 'contact')}
                InputLabelProps={{ style: { fontSize: 14, fontWeight: 400 } }}
              />
              <TextareaAutosize
                id='outlined-basic'
                placeholder='Lời chúc đến kẻ cô độc còn lại *'
                variant='outlined'
                sx={{ width: '100%' }}
                minRows={10}
                value={quotes}
                onChange={e => handleChangeValue(e, 'quotes')}
              />
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'right',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                {loading ? (
                  <CircularProgress sx={{ ml: 2 }} />
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleSubmit()}
                  >
                    Gửi cho Santa
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          background: `linear-gradient(to top, rgba(255,255,255,0.2) 10%, rgba(255,255,255,1)), url('/images/footer.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          position: 'relative',
        }}
      >
        <Snowfall />
      </Box>
      <DiaglogSuccess
        open={!!openDialog}
        uuid={uuid}
        handleClose={handleReset}
      />
    </Box>
  );
};

export default Christmas;

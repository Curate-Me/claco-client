import { useEffect, useState } from 'react';
import backgroundImage from '../../assets/images/loginbackground.png';
import { ReactComponent as CheckIcon }  from '@/assets/svgs/check.svg';
import { ReactComponent as CheckedIcon }  from '@/assets/svgs/checked.svg';
import { useNavigate } from 'react-router-dom';
import { ConfirmButton } from '@/components/common/Button';

export const TosPage = () => {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  const handleCheckClick = () => {
    setIsChecked(!isChecked);

  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleConfirmClick = () => {
    if (isChecked) {
        navigate('/create'); 
    }
};

  return (
    <div
      className='w-full h-screen bg-cover bg-center flex flex-col justify-end'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`flex flex-col bg-dark gap-[3.06rem] rounded-t-[1.88rem] transition-transform duration-700 ${
          show ? 'translate-y-0' : 'translate-y-full'
        } ${isModalOpen ? 'hidden' : ''}`} 
      >
        <div className='flex flex-col px-[1.75rem] pt-[2.13rem] gap-[1.25rem]'>
          <span className='flex flex-col heading1-semibold text-grayscale-80'>
            <span>환영해요!</span>
            <span>클라코가 클래식 공연의 길잡이가</span>
            <span>되어드릴게요</span>
          </span>
          <span className='flex flex-col caption-13 text-grayscale-70'>
            <span>클라코 서비스 이용을 위해</span>
            <span>개인정보 수집 및 이용에 대해 동의해 주세요.</span>
          </span>
        </div>
        <div className='flex flex-col px-[1.25rem] pb-[2.75rem] gap-[2rem]'>
          <div className={`flex justify-between items-center bg-grayscale-30 px-[1.25rem] py-[0.88rem] rounded-[0.44rem] border ${
              isChecked ? 'border-primary' : 'border-transparent'
            }`}>
            <div className='flex gap-[0.94rem] items-center cursor-pointer' onClick={handleCheckClick}>
            {isChecked ? (
              <CheckedIcon width="16" height="13" />
              ) : (
                <CheckIcon width="16" height="13" />
              )}
              <span className='body1-medium text-grayscale-80'>
                개인정보 수집 및 이용 동의
              </span>
            </div>
            <button className='caption-12 text-grayscale-80 underline' onClick={openModal}>
              약관 보기
            </button>
          </div>
          <ConfirmButton isChecked={isChecked} onClick={handleConfirmClick} disabled={!isChecked}>
            확인
          </ConfirmButton>
        </div>
      </div>

      {isModalOpen && (
        <div className='flex flex-col items-center justify-center px-[1.75rem] w-full h-full top-0 left-0'>
          <div className='flex flex-col w-full items-center justify-center px-[1.5rem] bg-dark gap-[2.06rem] rounded-[0.63rem]'>
            <span className='headline2-bold text-grayscale-80 pt-[2.5rem]'>
              개인정보 수집 및 이용 동의
            </span>
            <div className='flex flex-col w-full items-center justify-center gap-[3rem] pb-[1.69rem]'>
              <span className='caption-12 text-grayscale-90 justify-start'>
                제휴 및 제안/문의 수집과 안내를 위하여 개인정보보호법에 따라
                다음과 같이 귀하의 개인정보를 수집 및 이용하고자 합니다.<br /><br />
                ※ 귀하께서는 개인정보 제공 및 이용을 거부할 권리가 있으며,
                제공 사항은 제안 수집과 안내를 위하여 반드시 필요한 사항으로
                거부하실 경우 해당 서비스를 제공 받으실 수 없음을 알려 드립니다.<br /><br />
                개인정보의 수집 및 이용 목적 : 제휴 및 문의<br />
                수집 및 이용하려는 개인정보의 항목 : 닉네임, 성별, 나이, 위치<br />
                개인정보 보유 및 이용 기간: 2년
              </span>
              <button className='flex items-center justify-center w-full py-[0.88rem] bg-primary rounded-[0.31rem] text-body1-medium text-grayscale-90' onClick={closeModal}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
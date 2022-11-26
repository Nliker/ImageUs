import React from 'react';
import { BsPeople } from 'react-icons/bs';
import { SlCloudUpload } from 'react-icons/sl';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { BottomContainer, MobileNavItem, MobileNavList, UploadBtn, Wrapper } from './styles';
import useSWR from 'swr';

// interface Props {
//   showModal: (e: any) => void;
// }

const BottomNavBar = () => {
  const { mutate: uploadModalMutate } = useSWR('showUploadModal');

  const onClickUploadModal = () => {
    uploadModalMutate(true, false);
  }
  
  return (
    <Wrapper>
      <BottomContainer>
        <MobileNavList>
          <MobileNavItem>
            <NavLink to={'/my_page'}>
              <MdOutlineManageAccounts />
              마이 페이지
            </NavLink>
          </MobileNavItem>
          <MobileNavItem>
            <h1>
              <NavLink to={'/main_page'}>
                <HiOutlineHome />
                Cloudy
              </NavLink>
            </h1>
          </MobileNavItem>
          <MobileNavItem>
            <NavLink to={'/magnagement_page'}>
              <BsPeople />
              친구목록 관리
            </NavLink>
          </MobileNavItem>
          <MobileNavItem>
            <div className={"upload_btn"} onClick={onClickUploadModal}>
              <SlCloudUpload />
              <span>업로드</span>
            </div>
          </MobileNavItem>
        </MobileNavList>
      </BottomContainer>
    </Wrapper>
  );
};

export default BottomNavBar;

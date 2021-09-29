import styled from 'styled-components';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import StackOverflow from './Stackoverflow';

const Toggle = styled.button`
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.titleColor};
  color: ${(props) => props.theme.pageBackground};
  &:focus {
    outline: none;
  }
  transition: all 0.5s ease;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.pageBackground};
  transition: all 0.5s ease;
`;

function Splash(props) {
  function changeTheme() {
    if (props.theme === 'light') {
      props.setTheme('dark');
    } else {
      props.setTheme('light');
    }
  }

  const icon =
    props.theme === 'light' ? (
      <NightsStayIcon size={40} />
    ) : (
      <WbSunnyIcon size={40} />
    );

  return (
    <Page>
      <Toggle onClick={changeTheme}>{icon}</Toggle>
      <StackOverflow />
    </Page>
  );
}

export default Splash;

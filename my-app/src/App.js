import './css/App.css';
import styled from 'styled-components';
import GetLatestBlock from './components/GetLatestBlock';
import CurrentUser from './components/Authenticate';
import SendTransaction from './components/SendTransaction';

const Wrapper = styled.div`
    font-size: 13px;
    font-family: Arial, Helvetica, sans-serif;
`;


/**
 * App component
 */
function App() {
  
  return (
    <Wrapper>
      <GetLatestBlock />
      <CurrentUser />
      <SendTransaction />
    </Wrapper>
  );
}

export default App;

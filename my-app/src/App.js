import './css/App.css';
import styled from 'styled-components';
import GetLatestBlock from './components/GetLatestBlock';

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
    </Wrapper>
  );
}

export default App;

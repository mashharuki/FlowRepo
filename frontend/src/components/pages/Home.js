// mui関連のコンポーネントのインポート
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import './../../assets/css/App.css';
import ActionButton2 from '../common/ActionButton2';
import MyToken from './../../contracts/MyToken.json';

/** 
 * StyledPaperコンポーネント
 */
 const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 800,
    minHeight: 600,
    backgroundColor: 'rgb(150, 144, 144)'
}));

/**
 * Homeコンポーネント
 */
const Home = (props) => {
    // 引数からデータを取得する。
    const {
        CONTRACT_ADDRESS,
        provider,
        signer,
        RPC_URL  
    } = props;

    const [balance, setBalance] = useState(0);
    const [isLogined, setIsLogined] = useState(false);
    const [baseURL, setBaseURL] = useState('http://localhost:3001');

    /**
     * sign in/ sign up function 
     */
    const signInAction = async() => {
        setIsLogined(true);
    }

    useEffect(()=> {
        /**
         * init
         */
        const init = async() => {
            // コントラクト用のインスタンスを生成する。
            const instance = new provider.eth.Contract(MyToken.abi, CONTRACT_ADDRESS);
            // 残高を取得する
            const num = await instance.methods.balanceOf(signer).call();
            setBalance(num);
        }
        init();
    }, []);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    overflow: "hidden", 
                    px: 3, 
                    mt: 10, 
                    height: '80vh'
                }}
            >
                <StyledPaper 
                    sx={{
                        my: 1, 
                        mx: "auto", 
                        p: 0, 
                        borderRadius: 4, 
                        marginTop: 4
                    }}
                >
                    <Grid 
                        container 
                        justifyContent="center"
                    >
                        {isLogined ? (
                            <>
                                あなたのIDQToken:{balance}
                            </>
                        ) : (
                            <>
                                <ActionButton2 buttonName="Sign In / Up" color="primary" clickAction={signInAction} />
                            </>
                        )}
                    </Grid>
                </StyledPaper>
            </Box>
        </Grid>
    );
};

export default Home;
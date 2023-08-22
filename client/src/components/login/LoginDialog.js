import React,{ useState,useContext } from "react";
import { Dialog,Box,TextField ,Typography,Button,styled} from "@mui/material";
import { authenticateSignup,authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
const Component=styled(Box)`
height:70vh;
width:90vh;
`;
const Image=styled(Box)`
background:#2874f0 url( https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat ;
height:80%;
width:28%;
padding:45px 35px;
& > p,& > h5{
    color:white;
    font-weight:600;
}
`;
const Wrapper=styled(Box)`
display:flex;
flex-direction:column;
padding:25px 35px;
flex:1;
& > div,& > button,& > p{
    margin-top:20px;
}

`;
const LoginButton=styled(Button)`
    text-transform:none;
    background:#FB641B;
    color:#fff;
    height:48px;
    border-radius:2px;
`;
const RequestOtp=styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874F0;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/20%);
`;
const Text=styled(Typography)`
font-size:12px;
color:#878787;
`;
const CreateAccount=styled(Typography)`
font-size:14px;
text-align:center;
color:#2874F0;
font-weight:600;
cursor:pointer;
`;
const Error=styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600;
`
const accountInitialValues={
    login:{
        view:'login',
        heading:'Login',
        subHeading:'Get access to your Orders,Wishlist and Recommendations'
    },
    signup:{
        view:'signup',
        heading:"Look like you're new here!",
        subHeading:'Sign up with your mobile to get started'
    }
};
const signupInitialValues={
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password:'',
    phone:''
};
const loginInitialValues = {
    username:'',
    password:''

};
const LoginDialog=({open ,setOpen})=>{
    const [account,toggleAccount]=useState(accountInitialValues.login);
    const [signup,setSignup]=useState(signupInitialValues);
    const [login,setLogin]=useState(loginInitialValues);
    const [error,setError]=useState(false);
    const {setAccount}=useContext(DataContext);

    const handleClose=()=>{
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }
    const toggleSignup=()=>{
        toggleAccount(accountInitialValues.signup);
    }
    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value});
    }
    const signupUser=async ()=>{
        let response=await authenticateSignup(signup);
        if(!response)return;
        handleClose();
        setAccount(signup.firstname)
    }
    const onvalueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }
    const loginuser=async ()=>{
       let response=await authenticateLogin(login);
       console.log(response);
        if(response.status===200){
          handleClose();
          setAccount(response.data.data.firstname);
           }else{
            setError(true);
           }
    }
    return(
       <Dialog open={open} onClose={handleClose} PaperProps={{sx:{maxWidth:'unset'}}}>
            <Component>
            <Box style={{display:'flex',height:'100%'}}>
                <Image>
                    <Typography variant="h5">{account.heading}</Typography>
                    <Typography style={{marginTop:20}}>{account.subHeading}</Typography>
                </Image>
            {
                account.view==='login' ?
                <Wrapper>
                    <TextField variant="standard" label="Enter username" onChange={(e)=>onvalueChange(e)} name="username"/>
                    {error && <Error>Please enter valid username or password</Error>}
                    <TextField variant="standard" label="Enter Password" onChange={(e)=>onvalueChange(e)} name="password"/>
                    <Text>By continuing,you aggree to Flipkart's Terms of Use and Privacy Policy.</Text>
                    <LoginButton onClick={()=>loginuser()}>Login</LoginButton>
                    <Typography style={{textAlign:'center'}}>OR</Typography>
                    <RequestOtp>Request OTP</RequestOtp>
                    <CreateAccount onClick={()=>toggleSignup()}>New to Flipkart?Create an account</CreateAccount>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant="standard" label="Enter Firstname" onChange={(e)=>onInputChange(e)} name="firstname"/>
                    <TextField variant="standard" label="Enter Lastname" onChange={(e)=>onInputChange(e)} name="lastname"/>
                    <TextField variant="standard" label="Enter Username" onChange={(e)=>onInputChange(e)} name="username"/>
                    <TextField variant="standard" label="Enter Email" onChange={(e)=>onInputChange(e)} name="email"/>
                    <TextField variant="standard" label="Enter Password" onChange={(e)=>onInputChange(e)} name="password"/>
                    <TextField variant="standard" label="Enter Phone" onChange={(e)=>onInputChange(e)} name="phone"/>
                    <Text>By continuing,you aggree to Flipkart's Terms of Use and Privacy Policy.</Text>
                    <LoginButton onClick={()=>signupUser()}>Continue</LoginButton>  
                </Wrapper>
            }
                </Box>
            </Component>
       </Dialog>
    )

}
   


export default LoginDialog;
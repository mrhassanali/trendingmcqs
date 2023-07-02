import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from 'jsonwebtoken';  //for verify the token



export const authOptions = {
  session:{
    strategy:'jwt'
  },
  providers:[
    CredentialsProvider({
      // name: 'Credentials',
      async authorize(credentials, req) {
        // const { user } = useContext(AppContext);
        // const router = useRouter();
        const {token,status} = credentials;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      
        // if(!decodedToken.success){
        //   return null;
        // }

       if(decodedToken){
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
       }

        const user = { 
          id: 1, 
          name: decodedToken.userName, 
          email: decodedToken.email,
        }

        if(decodedToken.success){
          return user
        }else{
          return null
        }
      }
    }),
  ],
  secret:process.env.SECRET_KEY
}
export default NextAuth(authOptions)


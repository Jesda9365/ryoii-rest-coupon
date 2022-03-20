import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {userBrand} from '../../../db'
export default NextAuth({
  providers: [
    CredentialsProvider({        
        name: 'Credentials',        
        credentials: {
          username: { label: "Username", type: "text" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          
        //   const res = await fetch("https://www.mecallapi.com/api/login", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" }
        //   })
        //   const data = await res.json()

            const user = userBrand.find((val, index, array)=>{
                if(val.code_id==credentials.username){
                    return val;
                }
            });            

            if (user && credentials.password == '2456') {
                return user;
            }
         
          return null
        }
      })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  NEXTAUTH_URL:'http://rest-coupon.ryoii.io/api/auth',
  NEXTAUTH_URL_INTERNAL:'http://128.199.114.169',
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      //console.log(user);
      if (account) {
        token.accessToken = account.access_token,
        token.user = user
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user = token.user
      return session
    }
  }
})
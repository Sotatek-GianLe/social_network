import axios from "axios";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { serialize } from "cookie";

export default function login(req: NextRequest, res: NextApiResponse) {
    const data = req.body;
    if(req.method === 'POST'){
        axios.post('http://localhost:3000/auth/sign-in',{...data}).then(resp=>{
            if(resp.status === 200){
                req.cookies.set('access_token',resp.data.access_token)
                res.setHeader('Set-Cookie', serialize('access_token', resp.data.access_token,{
                    httpOnly: true,
                    sameSite: 'strict',
                    path: '/api',
                }))
                console.log(res.getHeader('Set-Cookie'))
                return res.status(200).send(resp)
            }
            return res.status(400).send('invalid data');
        }).catch(err=>res.send(err))
    }
}
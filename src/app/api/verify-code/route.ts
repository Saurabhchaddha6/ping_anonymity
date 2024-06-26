import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect()

    try {
        const {username, code} = await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername})

        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            },{status: 500})
        }

        const isCodeValid = user.verifyCode===code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()
            Response.json({
                success: true,
                message: "Account verified successfully"
            },{status: 200})
        }
        else if(!isCodeNotExpired){
            Response.json({
                success: false,
                message: "Verification code has expired"
            },{status: 400})
        }
        else{
            Response.json({
                success: false,
                message: "Incorrect Verification code"
            },{status: 400})
        
        }

        } catch (error){
        console.log("Error while verifying user", error)
        return Response.json(
            {
                success: false,
                message: "Error while verifying user"
            },
            {status: 500}
        )
    }
}

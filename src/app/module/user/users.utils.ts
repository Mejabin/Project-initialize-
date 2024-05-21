import { User } from "./user.Model"
export const findLastUserId =async () =>{
    //auto generated incremental id
    const lastUser =await User.findOne({},{id:1,_id: 0}).sort({
        createdAt:-1
    }).lean()
    return lastUser?.id
}
export const generateUserId =async () => {
    const currentId = (await findLastUserId())|| ((0).toString()).padStart(5,'0')
    //0000 //increment
    const incrementedId  = parseInt(currentId + 1)
    return incrementedId
}
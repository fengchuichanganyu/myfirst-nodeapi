const User =  require('../model/user.model')

class UserService{
    async createUser(user_name, password, userid){


        const res = await User.create({user_name,password, userid}) 
        //  console.log(res)
        return res.dataValues

    }
    
    async getUserInfo(userid){
        const res = await User.findOne({
            attributes:['userid','user_name'],
            where:userid
        })
// console.log(res)
        return res ? res.dataValues:null

    }


}

module.exports = new UserService()
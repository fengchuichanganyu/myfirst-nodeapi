const User =  require('../model/user.model')

class UserService{
    async createUser(user_number, password, userid,user_point){


        const res = await User.create({user_number,password, userid,user_point}) 
        //  console.log(res)
        return res.dataValues

    }
    
    async getUserInfo(userid){
        const res = await User.findOne({
            attributes:['userid','user_number','password','user_point'],
            where:userid
        })
// console.log(res)
        return res ? res.dataValues:null

    }

    async updateById({userid,password}){
      
        const res = await User.update({password},{where:{userid}} )


        console.log(res[0])
    

      return  res[0]>0 ? true : false
    }


}

module.exports = new UserService()
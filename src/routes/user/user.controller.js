import User from '../../model/user'
import Error from '../../lib/error'

export default class UserController extends Error{
    constructor(){
        super()
    }
    async getUserById(ctx, next) {
        const userId = ctx.params.id
	    if (isNaN(userId)) {
		    this.error(ctx, next, 'FORMAT_ERROR')
	    }
	    const data = await User.getUser(userId)
	    ctx.body = {
		    code: 200,
		    data: data
        }
    }
    async createUser(ctx, next) {
        const { name, password } = ctx.request.body
	    if (name.length > 100 && password.length > 32) {
            this.error(ctx, next, 'FORMAT_ERROR')
	    }
	    const newUserId = await User.createUser(name, password)
	    ctx.body = {
		    code: 200,
		    data: { newUserId }
	    }
    }
}
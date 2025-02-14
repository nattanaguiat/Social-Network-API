import {Schema, Types, model, type Document} from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            
            match: [/.+@.+\..+/, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                validate: {
                    //prevent a user from adding themselves as a friend
                    validator: function(this: Document & {_id: Types.ObjectId},  friendId: Types.ObjectId) {
                        return !this._id.equals(friendId);
                    },
                    message: "You cannot be your own friend. Please select a different user."
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model<IUser>('User', UserSchema);

export default User;
import {Schema, Types, model, type Document} from 'mongoose';

interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt: Date): string => createdAt.toLocaleString()
    } as unknown as Date // cast to make typescript happy
});

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt: Date): string => createdAt.toLocaleString()
        } as unknown as Date, // cast to make typescript happy
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// initialize the Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

const Reaction = model<IReaction>('Thought', reactionSchema);

export { Thought, Reaction };


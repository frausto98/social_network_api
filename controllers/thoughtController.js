const {User, Thought} = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({}).populate('reactions');
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.id }).populate('reactions');
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId }, 
                { $push: { thoughts: dbThoughtData._id }},
                { new: true }
                )

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {$set: req.body},
                { new: true }
            );
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // add reactions?
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            )
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {$pull: { reactions: {reactionId: req.params.reactionId} }},
                {new: true}
            )
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json({message: 'Reaction deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
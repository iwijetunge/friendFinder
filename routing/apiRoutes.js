// we need to require and bring in our friend data (possible matches)
const friends = require("../app/data/friends.js");

module.exports = app => {

    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    app.post("/api/friends", (req, res) => {
        const userScores = req.body.scores.map(score => Number.parseInt(score));
        // iterate through our friends array
        const matchedFriend = friends.map(friend => {
            // find their individual scores absolute value relative to the users score for each question
            const relativeScore = friend.scores.map((friendScore, index) => {
                return Math.abs(friendScore - userScores[index]);
            }).reduce((accumulator, currentValue) => accumulator + currentValue);

            friend.relativeScore = relativeScore;
            return friend;
        }).sort((a, b) => a.relativeScore - b.relativeScore)[0];

        friends.push(req.body);
        console.log("This is our matched friend: ", matchedFriend);
        return res.json(matchedFriend);       
    })
}
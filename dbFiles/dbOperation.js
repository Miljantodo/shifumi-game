const   config  = require('./dbConfig'),
        sql     = require('mssql');

const getScoreboard = async() => {
    try {
        let pool = await sql.connect(config);
        let score = pool.request().query("SELECT TOP 10 S.* FROM dbo.Scoreboard AS S ORDER BY S.Score DESC")
        return score;
    }
    catch(error) {
        console.log(error);
    }
}
const insertScore = async(Score, Choices) => {
    try {
        let pool = await sql.connect(config);
        let score = pool.request().query(`      
        DECLARE @InsertedGameID TABLE (GameID INT);

        INSERT INTO dbo.Scoreboard (Username, Score, GameRounds, GameDate)
        OUTPUT INSERTED.GameID INTO @InsertedGameID
        VALUES ('${Score.Username}', ${Score.Score}, ${Score.GameRounds}, GETDATE());

        DECLARE @GameID INT;
        SELECT @GameID = GameID FROM @InsertedGameID;

        ${Choices.map((choice,index)=>(`
        DECLARE @UserChoiceID${index} INT;
        SELECT @UserChoiceID${index} = CU.ChoiceID FROM dbo.Choice AS CU WHERE CU.Choice =  '${choice.user}';

        DECLARE @HouseChoiceID${index} INT;
        SELECT @HouseChoiceID${index} = CH.ChoiceID FROM dbo.Choice AS CH WHERE CH.Choice = '${choice.house}';

        INSERT INTO dbo.Game (GameID, GameRound, UserChoice, HouseChoice)
        VALUES (@GameID, ${index+1}, @UserChoiceID${index}, @HouseChoiceID${index});
        
        `)).join('')}
        `)
        return score;
    }
    catch(error) {
        console.log(error);
    }
}
    
module.exports = {
    getScoreboard,
    insertScore
}

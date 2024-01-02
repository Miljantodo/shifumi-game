const   express             = require('express'),
        Highscore           = require('./dbFiles/highscore'),
        dbOperation         = require('./dbFiles/dbOperation'),
        cors                = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.listen(API_PORT /*,()=> console.log(`Listening on port ${API_PORT}`)*/);

app.get('/api', async function(req, res) {
    try {
        const scoreboard = await dbOperation.getScoreboard();
        res.json(scoreboard.recordset);
    } catch (error) {
        console.error('Error fetching Scoreboard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submit', async (req, res) => {
    try {
        const { username, score } = req.body;
        const { totalUserScore, totalTies, rounds } = score;

        const Score = new Highscore(username, (totalUserScore+(totalTies/2)) * ((totalUserScore+(totalTies/2))/rounds.length) * 100, rounds.length);

        await dbOperation.insertScore(Score, rounds);
        
    } catch (error) {
        console.error('Error posting data:', error);
        res.status(500).send('Internal server error');
    }
  });







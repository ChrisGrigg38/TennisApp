import { Game, GameSet, Match, Point } from "../model/tennisTypes";


export const recordWin = (lastGame: Game, lastSet: GameSet, playerIndex: number) => {
    lastGame.winner = playerIndex;
    lastSet.playerAGamesWon = playerIndex === 0 ? lastSet.playerAGamesWon+1 : lastSet.playerAGamesWon;
    lastSet.playerBGamesWon = playerIndex === 1 ? lastSet.playerBGamesWon+1 : lastSet.playerBGamesWon;

    if(lastSet.playerAGamesWon >= 6 || lastSet.playerBGamesWon >= 6) lastSet.complete = true;
};

/**
 * Calculates the next score for a player
 * @param playerIndex - player index
 * @param lastGame - current game
 * @param lastPoint - last point assigned
 * @returns 
 */
export const nextScore = (playerIndex: number, lastGame: Game, lastPoint: Point, lastSet: GameSet): Point | null => {
    let curScore = playerIndex === 0 ? lastPoint.personAScore : lastPoint.personBScore;
    let altCurScore = playerIndex === 0 ? lastPoint.personBScore : lastPoint.personAScore;
    let curAdv = playerIndex === 0 ? lastPoint.advantageA : lastPoint.advantageB;
    let altAdv = playerIndex === 0 ? lastPoint.advantageB : lastPoint.advantageA;

    if(curScore < 30) {
        curScore += 15;
    } else if(curScore === 30) {
        curScore = 40;
    } else if(curScore === 40 && altCurScore !== 40) {
        curAdv = true;
        recordWin(lastGame, lastSet, playerIndex);
    } else if(curScore === 40 && altCurScore === 40) {
        if(altAdv) {
           altAdv = false;
        } else if(!curAdv) {
            curAdv = true;
        } else if(curAdv) {
            recordWin(lastGame, lastSet, playerIndex);
            return null;
        }
    }

    return {
        personAScore: playerIndex === 0 ? curScore : altCurScore,
        personBScore: playerIndex === 0 ? altCurScore : curScore,
        advantageA: playerIndex === 0 ? curAdv : altAdv,
        advantageB: playerIndex === 0 ? altAdv : curAdv,
    };
};

/**
 * Updates the score based on the input text
 * @param line - input text line
 * @param lastMatch - last current match
 */
export const updateScore = (line: string, lastMatch: Match) => {
    let playerIndex = line === "0" ? 0 : 1;
    let lastSet: GameSet | null = null;
    let lastGame: Game | null = null;
    let lastPoint: Point | null = null;

    if (lastMatch.sets.length > 0
        && !lastMatch.sets[lastMatch.sets.length - 1].complete) {
        lastSet = lastMatch.sets[lastMatch.sets.length - 1]; 
    } else {
        lastSet = {complete: false, games: [], playerAGamesWon: 0, playerBGamesWon: 0};
        lastMatch.sets.push(lastSet);
    }
    
    //winner not decided yet
    if(lastSet.games.length > 0 
        && lastSet.games[lastSet.games.length - 1].winner == -1) {
        lastGame = lastSet.games[lastSet.games.length - 1];
    } else { //create new game
        lastGame = {winner: -1, pointHistory: []};
        lastSet.games.push(lastGame);
    }

    lastPoint = lastGame.pointHistory.length > 0 ? lastGame.pointHistory[lastGame.pointHistory.length - 1] : null; 
   
    if(lastPoint === null) {
        lastGame.pointHistory.push({
            personAScore: playerIndex === 0 ? 15 : 0,
            personBScore: playerIndex === 1 ? 15 : 0,
            advantageA: false,
            advantageB: false
        });
    } else {
        let score = nextScore(playerIndex, lastGame, lastPoint, lastSet);

        if(score !== null) {
            lastGame.pointHistory.push(score);
        }
    }
}

/**
 * Updates the player names
 * @param line 
 * @param lastMatch 
 */
export const updatePlayerNames = (line: string, lastMatch: Match) => {
    let vsIndex = line.indexOf(" vs ");
    let playerA = line.substring(0, vsIndex);
    let playerB = line.substring(vsIndex + 4, line.length);
    lastMatch.personA = playerA;
    lastMatch.personB = playerB;
}

export const createNewMatch = (line: string, matches: Match[]): Match => {
    let matchName = line.substring(7);
    let duplicates = matches.filter((x) => x.id === matchName);

    if(duplicates.length > 0) throw new Error("Duplicate Match Found: " + matchName);

    let lastMatch = {id: matchName, sets: []};
    return lastMatch;
};

/**
 * parses match info 
 * @param matchesData 
 * @returns 
 */

export const parseMatches = (matchesData: string[]): Match[] => {
    let matches: Match[] = [];
    let lastMatch: Match | null = null;

    matchesData.forEach((line, lineindex) => {
         if(line.startsWith("Match") && line.length > 6) {
            if (lastMatch !== null) matches.push(lastMatch);
            lastMatch = createNewMatch(line, matches);
         } else if(line.includes(" vs ") && lastMatch !== null) {
            updatePlayerNames(line, lastMatch);
         } else if(lastMatch !== null && (line === "0" || line === "1")) {
            updateScore(line, lastMatch);   
         } else if (line !== "") {
            throw new Error("Invalid Format at line: " + lineindex)
         }
    });

    if(lastMatch !== null) matches.push(lastMatch);

    return matches;
}